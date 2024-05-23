import axios from 'axios';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  Action,
  FetchProps,
  HttpNormalizedResponse,
  HttpStatusProps
} from 'src/types/shared';

import { API_BASE_URL, IS_DEV_MODE } from 'src/constants';
import { dispatch } from 'src/store/main';
import { snackbar } from 'src/store/slices/misc';
import { log } from 'src/utils';

export class Http {
  static token?: string | null = process.env.API_KEY || null;

  /**
   *
   * @param url url of destination e.g. /lead/5df9e8t0wekc/ ... Base URL should not be included
   * @param requiresAuth if token/authentication will be required for the get action
   */
  async get<
    ResData,
    ActionCreator extends HttpMethodActionCreator = HttpMethodActionCreator
  >(
    url: string,
    options?: HttpMethodOptions<ActionCreator, ResData>
  ): Promise<Partial<FetchProps<ResData>>> {
    return await this.__request<ResData, ActionCreator>(url, options);
  }

  /**
   *
   * @param url (relative) url of destination e.g. /lead/<lead_id> ... Base URL should not be included
   * @param data data to be posted to destination
   */
  async post<
    ResData,
    ReqData = unknown,
    ActionCreator extends HttpMethodActionCreator = HttpMethodActionCreator
  >(
    url: string,
    options?: HttpMethodOptions<ActionCreator, ResData, ReqData>
  ): Promise<Partial<FetchProps<ResData>>> {
    return await this.__request<ResData, ActionCreator, ReqData>(url, {
      ...options,
      method: 'POST'
    });
  }

  /**
   *
   * @param url (relative) url of destination e.g. /lead/<lead_id> ... Base URL should not be included
   * @param data data to be posted to destination
   */
  async put<
    ResData,
    ReqData = unknown,
    ActionCreator extends HttpMethodActionCreator = HttpMethodActionCreator
  >(
    url: string,
    options?: HttpMethodOptions<ActionCreator, ResData, ReqData>
  ): Promise<Partial<FetchProps<ResData>>> {
    return await this.__request<ResData, ActionCreator, ReqData>(url, {
      ...options,
      method: 'PUT'
    });
  }

  async delete<
    ResData,
    ReqData = unknown,
    ActionCreator extends HttpMethodActionCreator = HttpMethodActionCreator
  >(url: string, options?: HttpMethodOptions<ActionCreator, ResData, ReqData>) {
    return await this.__request<ResData, ActionCreator, ReqData>(url, {
      ...options,
      method: 'DELETE'
    });
  }

  private async __request<
    ResData,
    ActionCreator extends HttpMethodActionCreator = HttpMethodActionCreator,
    ReqData = unknown
  >(
    url: string,
    options?: HttpMethodOptions<ActionCreator, ResData, ReqData>
  ): Promise<Partial<FetchProps<ResData>>> {
    const {
      requiresAuth = true,
      throwOnError,
      external,
      data,
      method,
      count,
      successMessage,
      preventPayloadDispatch,
      initActorPayload,
      middleware,
      dataMiddleware,
      actor,
      ...restOptions
    } = options || {};
    let payload: Partial<FetchProps<ResData>> | null = null;

    try {
      if (actor) {
        dispatch(actor({ ...initActorPayload, status: 'pending', err: false }));
      }

      const res: AxiosResponse<ResData> = await axios(
        this.returnRequestConfig(
          method || 'GET',
          external ? url : `${API_BASE_URL}${url}`,
          external ? false : requiresAuth,
          data,
          restOptions
        )
      );
      const message = this.getResponseMessage(res.statusText); // resData.message);
      const error = res.status >= 400;

      if (error) {
        throw new Error(message, { cause: res.status });
      }

      payload = this.normalizeResponse(
        {
          error,
          statusCode: res.status,
          ...(res.data ? { data: res.data } : {}),
          message:
            error || typeof successMessage !== 'string'
              ? message
              : successMessage
        },
        {
          count,
          middleware,
          dataMiddleware
        }
      );
      if (actor && preventPayloadDispatch !== true) dispatch(actor(payload));

      if (successMessage && !payload.error) {
        dispatch(
          snackbar({
            open: true,
            message: payload.message,
            severity: 'success',
            position: 'top'
          })
        );
      }
    } catch (e) {
      payload = this.logError(e, actor);

      if (throwOnError) throw e;
    }

    return payload;
  }

  normalizeResponse = <Data = unknown>(
    response: HttpNormalizedResponse<Data>,
    options?: {
      count?: number | null;
      middleware?: (_response: FetchProps<Data>) => FetchProps<Data>;
      dataMiddleware?: (data: Data) => Data;
    }
  ) => {
    const BAD_REQUEST = 400;
    const { data, message, error, statusCode } = response;
    const { count, dataMiddleware, middleware } = options || {};
    const err = !!error || (!!statusCode && statusCode >= BAD_REQUEST);
    const finalResponse = {
      status: 'fulfilled',
      err,
      ...(data ? { data: dataMiddleware ? dataMiddleware(data) : data } : {}),
      message,
      extra: { __listUpdateSentinel: Math.random(), __count: count },
      statusCode
    } as FetchProps<Data>;

    return middleware ? middleware(finalResponse) : finalResponse;
  };

  logError<
    ActionCreator extends (
      arg: Partial<HttpStatusProps & Record<string, any>>
    ) => Action<HttpStatusProps>
  >(err: unknown, action?: ActionCreator) {
    const error = err as Error;
    const message = /network|connection|internet/i.test(
      typeof error === 'string' ? error : error.message
    )
      ? `Hmm.🤔 Something went wrong. Kindly check that you're connected to the internet.${
          globalThis.navigator?.onLine
            ? ".. And if you are, then it's probably us.😕🤲🏼"
            : ''
        }`
      : ((error as Error)?.message || error).toString();
    const response: HttpNormalizedResponse<any> = {
      status: 'fulfilled',
      error: true,
      message,
      statusCode: (error.cause as number) || undefined
    };
    const isAPIError = /econnrefused|exception|timed?\sout/i.test(message);

    if (message) {
      if (action) dispatch(action(response));
      dispatch(
        snackbar({
          open: true,
          message: globalThis.navigator?.onLine
            ? `${message[0].toUpperCase() || ''}${message.slice(1)}`
            : 'You are offline.',
          severity:
            globalThis.navigator?.onLine &&
            (!/network|connect|internet|verif(y|i)/i.test(message) ||
              isAPIError)
              ? 'error'
              : 'info',
          variant: 'standard',
          ...(isAPIError ? { position: 'bottom' } : {})
        })
      );
    }

    if (IS_DEV_MODE) {
      log(
        `[${action?.name || 'unknown'}] An error occured: `,
        error?.message || error
      );
    }

    return response;
  }

  private returnRequestConfig(
    method: AxiosRequestConfig['method'],
    url: string,
    requiresAuth = true,
    data?: any,
    restOptions?: Omit<
      AxiosRequestConfig,
      'url' | 'method' | 'data' | 'validateStatus'
    >
  ): AxiosRequestConfig {
    return {
      ...(restOptions || {}),
      url,
      method,
      headers: {
        ...(restOptions?.headers || {}),
        ...(requiresAuth && Http.token
          ? { Authorization: `Bearer ${Http.token}` }
          : {}),
        'Content-Type': restOptions?.headers?.contentType || 'application/json'
      },
      data,
      validateStatus: (status) =>
        !/^(2|3|4|5)/.test(`${status}`) ? false : true
    };
  }

  private getResponseMessage = (message?: string[] | string) => {
    return (
      (!message
        ? message
        : Array.isArray(message)
        ? message.map((line) => line.replace(/^\w+(\.\d+)?\. /g, ' ').trim())[0]
        : message) || ''
    );
  };
}

export const http = new Http();

export interface HttpMethodOptions<
  ActionCreator,
  ResData = unknown,
  ReqData = unknown
> extends Omit<AxiosRequestConfig, 'url' | 'data' | 'validateStatus'> {
  requiresAuth?: boolean;
  external?: boolean;
  throwOnError?: boolean;
  successMessage?: string | boolean;
  /* Expected returned data (list) count (for GETs). */
  count?: number;
  data?: ReqData;
  /** Useful if you want to handle resultant payload (dispatch) yourself (probably with some helper/util) without it being done automatically. */
  preventPayloadDispatch?: boolean;
  initActorPayload?: Partial<FetchProps<unknown>>;
  actor?: ActionCreator;
  middleware?: (data: FetchProps<ResData>) => FetchProps<ResData>;
  dataMiddleware?: (data: ResData) => ResData;
}

export type HttpMethodActionCreator = (
  arg: Partial<HttpStatusProps & Record<string, any>>
) => Action<HttpStatusProps>;

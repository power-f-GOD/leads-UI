export const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const API_PORT = +(process.env.NEXT_PUBLIC_API_PORT || 0);
export const IS_DEV_MODE =
  process.env.MODE === 'development' || process.env.NODE_ENV === 'development';
export const HTTP_BASE_URL = `http://${API_HOST}`.concat(
  API_HOST === 'localhost' ? `:${API_PORT}` : ''
);
export const API_BASE_URL = HTTP_BASE_URL + '/test';

export const appEnv = {
  /** Use this to prevent server-client (component) hydration. */
  isBrowser: false,
  /** Use this to quickly tell/know when app is in a browser environment even before components mount. */
  isBrowser__aggressive: false,
  get window() {
    return {
      isMobile: this.isBrowser && window.innerWidth < 768,
      isTab: this.isBrowser && window.innerWidth < 1024,
      isPC: this.isBrowser && window.innerWidth >= 1024
    };
  }
};

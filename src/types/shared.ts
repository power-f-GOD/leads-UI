import type {
  BlockquoteHTMLAttributes,
  CSSProperties,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  LabelHTMLAttributes,
  MutableRefObject,
  ReactNode,
  Ref,
  SVGAttributes,
  SyntheticEvent
} from 'react';

export interface ButtonMenuOption {
  icon?: SVGIconName;
  emoji?: ReactNode;
  value: string | null;
  color?: CSSProperties['color'];
  disabled?: boolean;
  title?: string;
  className?: string;
  action?(e?: SyntheticEvent<HTMLElement>): void;
}

export interface FetchProps<
  Data,
  Extra extends Record<string, any> = Record<string, any>
> extends Omit<HttpNormalizedResponse<Data>, 'data'> {
  data: Data;
  extra: Extra &
    Partial<{
      __listUpdateSentinel: string | number;
      __count: number;
      __isLastPage: boolean;
    }>;
}

export interface HttpNormalizedResponse<Data> extends HttpStatusProps {
  data?: Data | null;
  statusCode?: number;
}

export interface HttpStatusProps {
  status?: 'inert' | 'pending' | 'fulfilled';
  error?: boolean | string;
  message?: string;
}

export interface Action<Payload = any, Type extends string = string> {
  type: Type;
  payload: Payload;
}

export type SVGIconProps = {
  name: SVGIconName;
  size?: string | number;
} & SVGAttributes<HTMLElement>;

export type SVGIconName =
  | 'thumbs-up'
  | 'contact'
  | 'thumbs-down'
  | 'delete'
  | 'ellipsis'
  | 'linkedin';

export interface SkeletonProps {
  type?: 'circle' | 'box';
  variant?: 'grey' | 'white';
  count?: string | number;
  className?: string;
  height?: string;
  width?: string;
  borderRadius?: string;
  size?: string;
  erred?: boolean;
  style?: CSSProperties;
  delayBeforeShowLoading?: number;
}

export type TextProps = Omit<ViewProps, 'as'> & {
  ref?: MutableRefObject<HTMLElement | null>;
  as?:
    | 'em'
    | 'strong'
    | 'address'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'span'
    | 'p'
    | 'i'
    | 'small'
    | 'blockquote';
};

export type StackProps = Partial<{
  className: string;
  component: ViewProps['component'];
  children: ViewProps['children'];
  /* Direction */
  horizontal: boolean;
  /* Direction - Default */
  vertical: boolean;
  center: boolean;
  centerX: boolean;
  centerY: boolean;
  ref: MutableRefObject<HTMLElement | null>;
}> &
  Pick<LabelHTMLAttributes<any>, 'htmlFor'> &
  HTMLAttributes<HTMLElement> &
  Pick<ViewProps, 'as' | 'dynamic'>;

export interface ViewProps
  extends Partial<
    DetailedHTMLProps<
      HTMLAttributes<HTMLElement> & BlockquoteHTMLAttributes<HTMLElement>,
      HTMLElement &
        HTMLParagraphElement &
        HTMLOListElement &
        HTMLUListElement &
        HTMLLIElement
    >
  > {
  as?: ViewAs;
  slot?: string;
  component?: FC<any>;
  ref?: Ref<any>;
  dynamic?: boolean;
}

export type ViewAs =
  | 'hr'
  | 'form'
  | 'br'
  | 'label'
  | 'em'
  | 'strong'
  | 'address'
  | 'nav'
  | 'header'
  | 'main'
  | 'aside'
  | 'footer'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'div'
  | 'span'
  | 'p'
  | 'ul'
  | 'ol'
  | 'li'
  | 'section'
  | 'i'
  | 'small'
  | 'blockquote';

import { forwardRef, memo, useMemo } from 'react';

import type { TextProps } from 'src/types';

import { View } from './View';

const _Text = forwardRef<HTMLElement, TextProps>(
  (
    { as, children, style, className, component, ...restProps },
    ref
  ): JSX.Element => {
    const Component = component || View;

    return (
      <Component
        {...restProps}
        as={as || 'span'}
        ref={ref}
        className={`Text ${className || ''}`}
        style={useMemo(() => style, [style])}>
        {children}
      </Component>
    );
  }
);

_Text.displayName = '_Text';

export const Text = memo(_Text);

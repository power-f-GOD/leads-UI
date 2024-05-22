import { forwardRef, memo, useMemo } from 'react';

import type { StackProps } from 'src/types';

import { View } from './View';

const _Stack = forwardRef<HTMLElement, StackProps>(
  (
    {
      children,
      component,
      style,
      horizontal,
      vertical,
      center,
      centerX,
      centerY,
      className,
      ...restProps
    },
    ref
  ): JSX.Element => {
    const Component = component || View;
    const isVertical =
      (!className?.includes('flex-row') || vertical) && !horizontal;

    return (
      <Component
        {...restProps}
        ref={ref}
        className={`Stack flex${
          isVertical ? ' flex-col' : horizontal ? ' flex-row' : ''
        } ${
          center
            ? 'items-center justify-center'
            : centerX
            ? isVertical
              ? 'items-center'
              : 'justify-center'
            : centerY
            ? isVertical
              ? 'justify-center'
              : 'items-center'
            : ''
        } ${className || ''}`}
        style={useMemo(() => style, [style])}>
        {children}
      </Component>
    );
  }
);

_Stack.displayName = '_Stack';

export const Stack = memo(_Stack);

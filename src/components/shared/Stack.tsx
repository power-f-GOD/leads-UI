import { forwardRef, memo, useMemo } from 'react';

import type { StackProps } from 'src/types';

import { View } from './View';

const _Stack = forwardRef<HTMLElement, StackProps>(
  (
    { children, component, style, className, ...restProps },
    ref
  ): JSX.Element => {
    const Component = component || View;

    return (
      <Component
        {...restProps}
        ref={ref}
        className={`Stack flex${
          !className?.includes('flex-row') ? ' flex-col' : ''
        } ${className || ''}`}
        style={useMemo(() => style, [style])}>
        {children}
      </Component>
    );
  }
);

_Stack.displayName = '_Stack';

export const Stack = memo(_Stack);

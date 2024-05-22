import { memo, useMemo } from 'react';

import type { FC } from 'react';

import type { SkeletonProps } from 'src/types';

import { Stack } from './Stack';

const _Skeleton: FC<SkeletonProps> = ({
  size,
  width,
  height,
  type,
  borderRadius,
  count,
  variant,
  erred,
  className: _className,
  style: _style
}) => {
  const hasRoundedClass = /(^|\s)rounded/.test(_className || '');
  const hasWidthClass = /(^|\s)w-/.test(_className || '');
  const hasHeightClass = /(^|\s)h-/.test(_className || '');
  const className = `${_className || ''}${
    hasHeightClass || height ? '' : ' h-1m'
  } ${type === 'circle' ? ' rounded-full' : ''}`;
  const style = useMemo(
    () => ({
      ..._style,
      ...((height || size) && !hasHeightClass
        ? { height: height || size }
        : {}),
      ...((width || size) && !hasWidthClass ? { width: width || size } : {}),
      ...(borderRadius && !hasRoundedClass ? { borderRadius } : {})
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      _style,
      borderRadius,
      hasHeightClass,
      hasRoundedClass,
      hasWidthClass,
      height,
      size,
      width
    ]
  );

  return (
    <>
      {Array(count || 1)
        .fill('')
        .map((_, i) => (
          <Stack
            key={i}
            as="span"
            className={`Skeleton relative rounded-md overflow-hidden ${
              className || ''
            } ${variant || ''} ${erred ? 'erred' : ''}`
              .replace(/\s+/g, ' ')
              .trim()}
            style={style}
          />
        ))}
    </>
  );
};

export const Skeleton = memo(_Skeleton);

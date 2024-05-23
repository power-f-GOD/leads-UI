import { memo } from 'react';

import type { FC, ReactNode } from 'react';

import { Stack } from 'src/components/shared/Stack';
import type { StackProps } from 'src/types';

import { Skeleton } from '../../shared/Skeleton';
import { Text } from '../../shared/Text';

const _TextPair: FC<
  StackProps & {
    primary: ReactNode;
    secondary: ReactNode;
    loading?: boolean;
    erred?: boolean;
    classNames?: Partial<{ primary: string; secondary: string }>;
  }
> = ({ primary, secondary, loading, erred, classNames, ...props }) => {
  return (
    <Stack
      {...props}
      className={`text-xs gap-0.5 leading-[14px] ${
        props.className || 'w-full'
      }`}>
      <Text className={`opacity-50 ${classNames?.secondary}`}>{secondary}</Text>
      <Text as="strong" className={classNames?.primary}>
        {primary || (
          <Skeleton erred={!loading || erred} className="w-full h-1m" />
        )}
      </Text>
    </Stack>
  );
};

export const TextPair = memo(_TextPair);

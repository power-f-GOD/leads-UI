import { IconButton } from '@mui/material';
import { memo, useCallback, useState } from 'react';

import type { FC } from 'react';

import { Skeleton } from 'src/components/shared/Skeleton';
import { Stack } from 'src/components/shared/Stack';
import S from 'src/styles/leads.module.scss';
import type { APILeadProps } from 'src/types';

const _Card: FC<
  Partial<APILeadProps> & {
    index: number;
    erred?: boolean;
    loading?: boolean;
  }
> = (props) => {
  const { erred, loading, __sentiment } = props;
  const [sentiment, setSentiment] = useState(__sentiment || 0);

  const onThumbsUp = useCallback(() => {
    console.log('thumbs up...');
    setSentiment((prev) => (prev === 1 ? 0 : 1));
  }, []);

  const onThumbsDown = useCallback(() => {
    console.log('thumbs down...');
    setSentiment((prev) => (prev === -1 ? 0 : -1));
  }, []);

  return (
    <Stack
      as="li"
      className={`${S.Card} relative transition m-0 h-80 rounded-2xl border border-solid overflow-clip bg-black/5 border-black/5 anim__fadeInUpTiny`}>
      <IconButton onClick={onThumbsUp}>Up</IconButton>
      <IconButton onClick={onThumbsDown}>Down</IconButton>
      {sentiment}
      <Skeleton erred={erred || !loading} className="w-full h-full" />
    </Stack>
  );
};

export const Card = memo(_Card);

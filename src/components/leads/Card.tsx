import { IconButton } from '@mui/material';
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';

import type { FC } from 'react';

import { Skeleton } from 'src/components/shared/Skeleton';
import { Stack } from 'src/components/shared/Stack';
import { SVGIcon } from 'src/components/shared/SVGIcon';
import S from 'src/styles/leads.module.scss';
import type { APILeadProps } from 'src/types';

import { TextPair } from './TextPair';

const _Card: FC<
  Partial<APILeadProps> & {
    index: number;
    erred?: boolean;
    loading?: boolean;
  }
> = ({
  _id,
  name,
  current_title,
  overall_bucket,
  city,
  lead_date,
  index,
  loading,
  profile_url,
  __sentiment
}) => {
  const [sentiment, setSentiment] = useState<typeof __sentiment>(
    __sentiment || 0
  );

  const onThumbsUp = useCallback(() => {
    setSentiment((prev) => (prev === 1 ? 0 : 1));
  }, []);

  const onThumbsDown = useCallback(() => {
    setSentiment((prev) => (prev === -1 ? 0 : -1));
  }, []);

  return (
    <Stack
      as="li"
      className={`${
        S.Card || ''
      } relative transition m-0 rounded-2xl border border-solid overflow-clip bg-white/5 border-black/10 anim__fadeInUpTiny`}
      style={{ animationDelay: `${0.1 * index}s` }}>
      <Stack className="p-3.5 pt-2 gap-1.5 sm:p-4 sm:pt-2.5">
        <Stack horizontal centerY className="justify-between">
          <Stack center className="w-5 h-5 rounded-md bg-black/5">
            <SVGIcon name="contact" className="h-3.5 w-3.5" />
          </Stack>

          <Stack horizontal centerY className="gap-1">
            {[
              {
                onThumbs: onThumbsUp,
                className:
                  sentiment === 1 ? 'fill-green-400 anim__thumbsUp' : ''
              },
              {
                onThumbs: onThumbsDown,
                className: sentiment === -1 ? 'fill-red-400' : ''
              }
            ].map(({ onThumbs, className }, i) => (
              <IconButton
                onClick={onThumbs}
                className="p-1 w-6 h-6"
                key={i}
                disabled={!_id}>
                <SVGIcon
                  name={`thumbs-${i === 0 ? 'up' : 'down'}`}
                  className={`w-3.5 h-3.5 text-transparent h-3 ${
                    className || 'fill-black/20'
                  }`}
                />
              </IconButton>
            ))}

            <IconButton className="-mr-1.5" disabled={!_id}>
              <SVGIcon name="ellipsis" className="w-4 h-4" />
            </IconButton>
          </Stack>
        </Stack>

        <TextPair
          secondary="Name"
          primary={name}
          className="w-full"
          loading={loading}
        />

        <Stack horizontal className="gap-5 justify-between">
          <TextPair
            secondary="Role"
            primary={current_title}
            className="w-4/12"
            classNames={{ primary: 'truncate' }}
            loading={loading}
          />
          <TextPair
            secondary="Net Worth"
            primary={overall_bucket}
            className="w-4/12"
            loading={loading}
          />
          <TextPair
            secondary="City"
            primary={city}
            className="w-4/12"
            loading={loading}
          />
        </Stack>
      </Stack>

      <Stack
        horizontal
        className="p-3.5 py-2 gap-5 justify-between items-end w-full bg-black/[0.035] sm:p-4 sm:py-2.5">
        <TextPair
          secondary="Date"
          primary={lead_date}
          loading={loading}
          className="w-40"
        />

        {profile_url ? (
          <Link href={profile_url} target="_blank" className="leading-none">
            <SVGIcon name="linkedin" className="w-5 h-5" />
          </Link>
        ) : (
          <Skeleton erred={!loading} className="w-5 h-5 rounded-md" />
        )}
      </Stack>
    </Stack>
  );
};

export const Card = memo(_Card);

import { IconButton } from '@mui/material';
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';

import type { FC } from 'react';

import { ButtonMenu } from 'src/components/shared/ButtonMenu';
import { Skeleton } from 'src/components/shared/Skeleton';
import { Stack } from 'src/components/shared/Stack';
import { SVGIcon } from 'src/components/shared/SVGIcon';
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
  const [contacted, setContacted] = useState(false);

  const onThumbsUp = useCallback(() => {
    setSentiment((prev) => (prev === 1 ? 0 : 1));
  }, []);

  const onThumbsDown = useCallback(() => {
    setSentiment((prev) => (prev === -1 ? 0 : -1));
  }, []);

  const onContacted = useCallback(() => {
    setContacted((prev) => !prev);
  }, []);

  return (
    <Stack
      as="li"
      className={`relative transition m-0 rounded-2xl border border-solid overflow-clip bg-white/5 border-black/10 anim__fadeInUpTiny`}
      style={{ animationDelay: `${0.1 * index}s` }}>
      <Stack className="p-3.5 pt-2 gap-1.5 sm:p-4 sm:pt-2.5">
        <Stack horizontal centerY className="justify-between debugge r">
          <IconButton
            className={`w-5 h-5 p-0 rounded-md ${
              contacted ? 'bg-[#57C2EF] text-white' : 'bg-black/5'
            }`}
            onClick={onContacted}>
            <SVGIcon name="contact" className="h-3.5 w-3.5" />
          </IconButton>

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
                  className={`text-transparent ${className || 'fill-black/20'}`}
                  size="0.875rem"
                />
              </IconButton>
            ))}

            <ButtonMenu
              popoverPosition="right"
              iconButtonProps={{ className: '-mr-1.5 p-1', disabled: !_id }}
              menuItemProps={{ className: 'justify-between' }}
              options={[
                {
                  value: `Mark${contacted ? ' not' : ''} contacted`,
                  icon: 'contact',
                  action: onContacted
                },
                {
                  value: 'Delete',
                  icon: 'delete',
                  className:
                    'opacity-70 text-red-700 hover:opacity-100 focus:opacity-100',
                  action: () => {
                    // const canDelete = confirm(
                    //   '[Simulate Modal] Are you sure you want to delete this lead?'
                    // );
                    // if (canDelete) {
                    // }
                  }
                }
              ]}>
              <SVGIcon name="ellipsis" size="1.25rem" />
            </ButtonMenu>
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

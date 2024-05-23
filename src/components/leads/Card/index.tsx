import Link from 'next/link';
import { memo, useState } from 'react';

import type { FC } from 'react';

import { Skeleton } from 'src/components/shared/Skeleton';
import { Stack } from 'src/components/shared/Stack';
import { SVGIcon } from 'src/components/shared/SVGIcon';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import type { APILeadProps } from 'src/types';

import { Actions } from './Actions';
import { TextPair } from './TextPair';

const _Card: FC<
  Partial<APILeadProps> & {
    index: number;
    erred?: boolean;
    loading?: boolean;
    page: number;
  }
> = ({
  _id,
  name,
  current_title,
  overall_bucket,
  city,
  lead_date,
  index,
  page,
  loading,
  profile_url,
  __sentiment
}) => {
  const { status, message } =
    useTypedSelector(
      (state) => (state.lead.data?._id === _id ? state.lead : null),
      (a, b) => a === b
    ) || {};
  const [isDeleted, setIsDeleted] = useState(false);
  const isLoadingAction = status === 'pending';
  const isReadId = (_id?.length || 0) > 10;
  const disable = isLoadingAction || !isReadId;

  return (
    <Stack
      as="li"
      className={`relative transition m-0 rounded-2xl border border-solid overflow-clip border-black/10 dark:border-white/10 ${
        isDeleted ? 'anim__onDeleteLead' : !isReadId ? 'anim__fadeInUpTiny' : ''
      } ${disable ? 'cursor-not-allowed' : ''}`}
      style={{ animationDelay: `${0.1 * index}s` }}>
      <Stack className="p-3.5 pt-2 gap-1.5 sm:p-4 sm:pt-2.5">
        <Actions
          _id={_id}
          page={page}
          sentiment={__sentiment}
          status={status}
          message={message}
          setIsDeleted={setIsDeleted}
        />

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
            classNames={{ primary: 'truncate', secondary: 'truncate' }}
            className="w-4/12"
            loading={loading}
          />
          <TextPair
            secondary="City"
            primary={city}
            className="w-4/12"
            classNames={{ primary: 'truncate' }}
            loading={loading}
          />
        </Stack>
      </Stack>

      <Stack
        horizontal
        className="p-3.5 py-2 gap-5 justify-between items-end w-full bg-black/[0.035] dark:bg-white/[0.035] sm:p-4 sm:py-2.5">
        <TextPair
          secondary="Date"
          primary={lead_date && new Date(lead_date).toDateString().slice(4)}
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

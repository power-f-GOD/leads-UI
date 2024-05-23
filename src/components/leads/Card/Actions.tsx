import { IconButton } from '@mui/material';
import { memo, useCallback, useState } from 'react';

import type { Dispatch, FC, SetStateAction } from 'react';

import { ButtonMenu } from 'src/components/shared/ButtonMenu';
import { Spinner } from 'src/components/shared/Spinner';
import { Stack } from 'src/components/shared/Stack';
import { SVGIcon } from 'src/components/shared/SVGIcon';
import { deleteLead, giveLeadSentiment } from 'src/services/leads';
import type { APILeadSentimentProps, HttpStatusProps } from 'src/types';

const _Actions: FC<
  {
    _id: string | undefined;
    sentiment: APILeadSentimentProps | undefined;
    page: number;
    setIsDeleted: Dispatch<SetStateAction<boolean>>;
  } & HttpStatusProps
> = ({ _id, page, sentiment: _sentiment, status, message, setIsDeleted }) => {
  const [sentiment, setSentiment] = useState(_sentiment?.sentiment || 0);
  const [contacted, setContacted] = useState(false);
  const isLoadingAction = status === 'pending';
  const isDeleting = message?.includes('Deleting');
  const isReadId = (_id?.length || 0) > 10;
  const disable = isLoadingAction || !isReadId;

  const onThumbs = useCallback(
    (action: 'up' | 'down') => {
      const next =
        action === 'up' ? (sentiment === 1 ? 0 : 1) : sentiment === -1 ? 0 : -1;

      giveLeadSentiment(_id!, next).then(({ error }) => {
        if (!error) setSentiment(next);
      });
    },
    [_id, sentiment]
  );

  const onThumbsUp = useCallback(() => {
    onThumbs('up');
  }, [onThumbs]);

  const onThumbsDown = useCallback(() => {
    onThumbs('down');
  }, [onThumbs]);

  const onContacted = useCallback(() => {
    setContacted((prev) => !prev);
  }, []);

  return (
    <Stack horizontal centerY className="justify-between debugge r">
      <IconButton
        className={`w-5 h-5 p-0 rounded-md disabled:text-current ${
          contacted
            ? 'bg-brand-cyan text-white hover:bg-brand-cyan-700 dark:bg-brand-cyan-700'
            : 'bg-black/5 text-current dark:bg-white/5'
        }`}
        disabled={disable}
        onClick={onContacted}>
        <SVGIcon name="contact" size="0.875rem" />
      </IconButton>

      <Stack horizontal centerY className="gap-1">
        {[
          {
            onThumbs: onThumbsUp,
            className: sentiment === 1 ? 'fill-green-400 anim__thumbsUp' : ''
          },
          {
            onThumbs: onThumbsDown,
            className: sentiment === -1 ? 'fill-red-400' : ''
          }
        ].map(({ onThumbs, className }, i) => (
          <IconButton
            onClick={onThumbs}
            className={`p-1 w-6 h-6 ${isLoadingAction ? 'opacity-50' : ''}`}
            key={i}
            disabled={disable}>
            <SVGIcon
              name={`thumbs-${i === 0 ? 'up' : 'down'}`}
              className={`text-transparent ${
                className || 'fill-black/20 dark:fill-white/30'
              }`}
              size="0.875rem"
            />
          </IconButton>
        ))}

        <ButtonMenu
          popoverPosition="right"
          iconButtonProps={{
            className: '-mr-1.5 ml-1 p-1',
            disabled: disable
          }}
          menuItemProps={{ className: 'justify-between' }}
          options={[
            {
              value: `Mark${contacted ? ' not' : ''} contacted`,
              icon: 'contact',
              className: 'dark:text-white/80',
              action: onContacted
            },
            {
              value: 'Delete',
              icon: 'delete',
              className:
                'opacity-70 text-red-700 hover:opacity-100 focus:opacity-100',
              action: () => {
                const canDelete = confirm(
                  '[Simulate Modal] Are you sure you want to delete this lead?'
                );

                if (canDelete) {
                  deleteLead(_id!, page).then((d) => {
                    if (!d.error) setIsDeleted(true);
                  });
                }
              }
            }
          ]}>
          {isDeleting ? (
            <Spinner size="1.25rem" />
          ) : (
            <SVGIcon name="ellipsis" size="1.25rem" />
          )}
        </ButtonMenu>
      </Stack>
    </Stack>
  );
};

export const Actions = memo(_Actions);

'use client';

import { Button } from '@mui/material';
import { Fragment } from 'react';

import type { ButtonProps } from '@mui/material';

import { Card } from 'src/components/leads';
import { Spinner } from 'src/components/shared/Spinner';
import { Stack } from 'src/components/shared/Stack';
import { Text } from 'src/components/shared/Text';
import { useService } from 'src/hooks/useService';
import { fetchLeads } from 'src/services/leads';

const Leads = () => {
  const { data, status, extra } = useService(fetchLeads, { path: 'leads' });
  const pagination: Array<ButtonProps | null> = [
    { value: 'First' },
    { value: '< Prev' },
    null,
    { value: 'Next >' },
    { value: 'Last' }
  ];
  const { page, limit } = extra;
  const nPages = Math.ceil(data.total_results / limit);

  return (
    <Stack as="main" className="pb-40 max-w-6xl mx-auto">
      <Stack
        as="ul"
        className={`grid m-0 px-5 gap-5 list-none w-full max-w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
        {data.leads.map((props, i) => {
          return (
            <Card
              {...props}
              key={props._id}
              index={i}
              page={page}
              loading={status !== 'fulfilled'}
            />
          );
        })}
      </Stack>

      <Stack className="sticky bottom-0 p-5 py-3 mt-5 bg-white/80 backdrop-blur-sm dark:bg-transparent">
        <Stack horizontal centerY className="gap-1.5 justify-end">
          {status === 'pending' && <Spinner size="1em" />}
          {pagination.map((props, i) => (
            <Fragment key={i}>
              {props ? (
                <Button
                  {...props}
                  size="small"
                  className="capitalize text-xs px-2 min-w-0 dark:text-white/90 disabled:text-current"
                  disabled={status !== 'fulfilled'}
                  onClick={() => {
                    fetchLeads({
                      page: Math.max(
                        Math.min(
                          props.value === 'First'
                            ? 1
                            : props.value === '< Prev'
                            ? page - 1
                            : props.value === 'Next >'
                            ? page + 1
                            : nPages,
                          nPages
                        ),
                        0
                      )
                    });
                  }}>
                  {props.value}
                </Button>
              ) : (
                <Text className="text-xs opacity-60">
                  Page {nPages ? page : 0} of {nPages}
                </Text>
              )}
            </Fragment>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Leads;

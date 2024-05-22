'use client';

import { Card } from 'src/components/leads';
import { Stack } from 'src/components/shared/Stack';
import { useService } from 'src/hooks/useService';
import { fetchLeads } from 'src/services/leads';

const Leads = () => {
  const { data, status } = useService(fetchLeads, { path: 'leads' });

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
              loading={status !== 'fulfilled'}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Leads;

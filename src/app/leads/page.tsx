'use client';

import { Card } from 'src/components/leads';
import { Stack } from 'src/components/shared/Stack';
import { useTypedSelector } from 'src/store/main';

const Leads = () => {
  const { data } = useTypedSelector(
    (state) => state.leads,
    (a, b) => a === b
  );

  return (
    <>
      <Stack as="main">
        <Stack
          as="ul"
          className={`grid m-0 px-5 gap-5 list-none w-full max-w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
          {data.map((props, i) => {
            return <Card {...props} key={props._id} index={i} />;
          })}
        </Stack>
      </Stack>
    </>
  );
};

export default Leads;

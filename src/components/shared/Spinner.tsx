import { CircularProgress } from '@mui/material';
import { memo } from 'react';

import type { CircularProgressProps } from '@mui/material';
import type { CSSProperties, FC } from 'react';

import { View } from './View';

const _Spinner: FC<
  CircularProgressProps & {
    fill?: CSSProperties['color'];
    circleColor?: CSSProperties['color'];
    noAnimate?: boolean;
  }
> = ({ className, noAnimate, ...props }) => {
  return (
    <View className={`relative flex ${className || ''}`}>
      <CircularProgress
        variant="determinate"
        className="text-black/10"
        classes={{ circle: 'dark:stroke-white/10' }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className="text-black/40"
        sx={{
          animationDuration: '300ms',
          animationName: noAnimate ? 'unset' : undefined,
          position: 'absolute',
          left: 0
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </View>
  );
};

export const Spinner = memo(_Spinner);

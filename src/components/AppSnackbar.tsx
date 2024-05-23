import {
  Alert,
  AlertTitle,
  Button,
  Snackbar as MuiSnackbar,
  Slide
} from '@mui/material';
import { memo, useCallback } from 'react';
import { shallowEqual } from 'react-redux';

import type { SlideProps } from '@mui/material';

import { dispatch, snackbar, useTypedSelector } from 'src/store';

const _AppSnackbar = () => {
  const {
    open,
    severity,
    variant,
    message,
    label,
    duration,
    position,
    title,
    autoHide
  } = useTypedSelector((state) => state.snackbar, shallowEqual);

  const handleOnClose = useCallback(() => {
    dispatch(snackbar({ open: false }));
  }, []);

  const SlideTransition = useCallback(
    (props: SlideProps) => {
      return (
        <Slide
          {...props}
          direction={
            position === 'top' || (!position && severity !== 'info')
              ? 'down'
              : 'up'
          }
        />
      );
    },
    [position, severity]
  );

  return (
    <MuiSnackbar
      open={!!open}
      autoHideDuration={duration || 6000}
      onClose={autoHide ? handleOnClose : undefined}
      action={
        <Button color={severity} size="small" onClick={handleOnClose}>
          {label || 'OK'}
        </Button>
      }
      TransitionComponent={
        // severity === 'info' ? undefined :
        SlideTransition
      }
      anchorOrigin={
        position === 'top' || (!position && severity !== 'info')
          ? { vertical: 'top', horizontal: 'right' }
          : globalThis.innerWidth < 768
          ? { vertical: 'bottom', horizontal: 'right' }
          : undefined
      }>
      <Alert
        onClose={handleOnClose}
        severity={severity}
        variant={
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'filled'
            : variant ?? 'standard'
        }
        className="shadow-xl rounded-xl max-w-md">
        {title && (
          <AlertTitle className="text-capitalize mb-1">
            {typeof title === 'boolean' ? `${severity}!` : title}
          </AlertTitle>
        )}
        {message && <>{message[0].toUpperCase() + message.slice(1)}</>}
      </Alert>
    </MuiSnackbar>
  );
};

export const AppSnackbar = memo(_AppSnackbar);

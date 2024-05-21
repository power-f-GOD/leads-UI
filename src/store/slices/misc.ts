import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { SnackbarProps } from 'src/types';

export const snackbarSlice = createSlice({
  initialState: {
    open: false,
    message: ' ',
    severity: 'info',
    duration: 4000,
    title: false,
    autoHide: true,
    position: 'top'
  } as SnackbarProps,
  name: 'snackbar',
  reducers: {
    snackbar: (state, action: PayloadAction<SnackbarProps>) => {
      const payload = { ...action.payload };

      if (payload.message) {
        payload.message = Array.isArray(payload.message)
          ? payload.message.join(' ')
          : payload.message;
      }

      return payload?.open
        ? { title: false, autoHide: true, ...payload }
        : { ...state, ...payload };
    }
  }
});

export const { snackbar } = {
  ...snackbarSlice.actions
};

export const miscReducers = {
  snackbar: snackbarSlice.reducer
};

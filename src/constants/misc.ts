import type { HttpStatusProps } from 'src/types/shared';

export const httpStatusPropsInit: HttpStatusProps = Object.freeze({
  error: false,
  status: 'inert',
  message: ''
});

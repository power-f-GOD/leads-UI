export interface SnackbarProps {
  open?: boolean;
  message?: string;
  severity?: 'error' | 'info' | 'success' | 'warning';
  variant?: 'filled' | 'standard';
  duration?: number;
  label?: string;
  position?: 'top' | 'bottom';
  title?: string | boolean;
  autoHide?: boolean;
}

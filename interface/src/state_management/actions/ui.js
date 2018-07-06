import { debouncedAction } from 'state_management/utils';


// eslint-disable-next-line import/prefer-default-export
export const resizeWindow = debouncedAction(50, () => (
  {
    type: 'RESIZE_WINDOW',
  }
));

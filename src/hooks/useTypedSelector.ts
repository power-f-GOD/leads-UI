import { useSelector } from 'react-redux';

import type { TypedUseSelectorHook } from 'react-redux';

import type { StateProps } from 'src/store';

export const useTypedSelector: TypedUseSelectorHook<StateProps> = useSelector;

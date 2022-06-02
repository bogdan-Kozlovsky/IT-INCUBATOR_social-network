import { GeneralType } from '../../actionCreator/app/types';

import { InitialStateType } from './types';

const initialState = {
  isInitialized: false,
  isProgress: true,
  errorMessage: null,
};

export const appReducer = (state: InitialStateType = initialState, action: GeneralType): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZED-SUCCESS':
      return { ...state, isInitialized: action.value };
    case 'APP-ERROR':
      return { ...state, errorMessage: action.value };
    case 'PROGRESS':
      return { ...state, isProgress: action.value };
    default:
      return state;
  }
};

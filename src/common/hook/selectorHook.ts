import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { errorAC } from 'redux/reducer/app-reducer';
import { AppStateType } from 'redux/store';

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export const ErrorFunc = (error: any, dispatch: Dispatch) => {
  if (error) {
    dispatch(errorAC(error));
    const callTimer = 2000;
    setTimeout(() => {
      dispatch(errorAC(null));
    }, callTimer);
  }
};

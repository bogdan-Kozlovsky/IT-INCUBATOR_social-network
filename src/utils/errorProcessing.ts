import { Dispatch } from 'redux';

import { errorAC } from '../redux/reducer/app-reducer';

const DELAY = 5000;

export const errorProcessing = (error: string, dispatch: Dispatch) => {
  if (error) {

    dispatch(errorAC(error));

    setTimeout(() => {
      dispatch(errorAC(null));
    }, DELAY);
  }
};


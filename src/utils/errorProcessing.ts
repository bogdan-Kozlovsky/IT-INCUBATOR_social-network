import { Dispatch } from 'redux';

import { errorAC } from '../redux/actionCreator/app/actionCreators';

const DELAY = 5000;

export const errorProcessing = (error: string, dispatch: Dispatch) => {
  if (error) {

    dispatch(errorAC(error));

    setTimeout(() => {
      dispatch(errorAC(null));
    }, DELAY);
  }
};


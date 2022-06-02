import { Dispatch } from 'redux';

import { authApi } from '../../../api/auth';
import { RESPONSE_NUMBER } from '../../../enums/patch';
import { errorProcessing } from '../../../utils/errorProcessing';
import { initializeSuccessAC, progressAC } from '../../actionCreator/app/actionCreators';
import { setAuthUserDataAC } from '../../actionCreator/auth/actionCreators';

export const getAuthUserDataTC = () => async (dispatch: Dispatch) => {
  try {
    dispatch(progressAC(false));
    const response = await authApi.me();
    if (response.data.resultCode === RESPONSE_NUMBER.COMPLETED_SUCCESSFULLY_NUMBER) {
      const { id, email, login } = response.data.data;
      dispatch(setAuthUserDataAC(id, email, login, true));
      dispatch(initializeSuccessAC(true));
    }
    const number = 1;
    if (response.data.resultCode === number) {
      dispatch(initializeSuccessAC(true));
      errorProcessing(response.data.messages[0], dispatch);
    }
  } catch (error) {
    dispatch(initializeSuccessAC(true));
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  } finally {
    dispatch(progressAC(true));
  }
};
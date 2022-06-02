import { Dispatch } from 'redux';

import { authApi } from '../../../api/auth';
import { RESPONSE_NUMBER } from '../../../enums/patch';
import { errorProcessing } from '../../../utils/errorProcessing';
import { initializeSuccessAC } from '../../actionCreator/app/actionCreators';
import { setAuthUserDataAC } from '../../actionCreator/auth/actionCreators';

export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    const response = await authApi.logout();
    if (response.data.resultCode === RESPONSE_NUMBER.COMPLETED_SUCCESSFULLY_NUMBER) {
      dispatch(setAuthUserDataAC(undefined, null, null, false));
      dispatch(initializeSuccessAC(true));
    }
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  }
};
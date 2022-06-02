import { stopSubmit } from 'redux-form';

import { authApi } from '../../../api/auth';
import { RESPONSE_NUMBER } from '../../../enums/patch';
import { ThunkType } from '../../../types/thunkType';
import { errorProcessing } from '../../../utils/errorProcessing';

import { getAuthUserDataTC } from './getAuthUserDataTC';
import { getCaptchaUrlTC } from './getCaptchaUrlTC';

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  try {
    const response = await authApi.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === RESPONSE_NUMBER.COMPLETED_SUCCESSFULLY_NUMBER) {
      await dispatch(getAuthUserDataTC());
    }
    if (response.data.resultCode === RESPONSE_NUMBER.REDIRECT_TO_CAPTCHA) {
      await dispatch(getCaptchaUrlTC());
    }
    const minNumber = 0;
    const message = response.data.messages.length > minNumber ? response.data.messages[0] : 'Some error';
    dispatch(stopSubmit('login', { _error: message }));
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  }
};
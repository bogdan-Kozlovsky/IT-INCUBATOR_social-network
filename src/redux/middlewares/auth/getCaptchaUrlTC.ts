import { Dispatch } from 'redux';

import { securityApi } from '../../../api/security';
import { errorProcessing } from '../../../utils/errorProcessing';
import { getCaptchaUrlSuccessAC } from '../../actionCreator/auth/actionCreators';

export const getCaptchaUrlTC = () => async (dispatch: Dispatch) => {
  try {
    const response = await securityApi.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccessAC(captchaUrl));
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  }
};

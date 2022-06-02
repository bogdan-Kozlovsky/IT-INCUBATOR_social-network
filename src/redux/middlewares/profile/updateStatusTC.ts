import { Dispatch } from 'redux';

import { profileApi } from '../../../api/profile';
import { RESPONSE_NUMBER } from '../../../enums/patch';
import { errorProcessing } from '../../../utils/errorProcessing';
import { progressAC } from '../../actionCreator/app/actionCreators';
import { setStatusAC } from '../../actionCreator/profile/actionCreator';

export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(progressAC(false));
    const response = await profileApi.updateStatusProfile(status);
    if (response.data.resultCode === RESPONSE_NUMBER.COMPLETED_SUCCESSFULLY_NUMBER) {
      dispatch(setStatusAC(status));
    }
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  } finally {
    dispatch(progressAC(true));
  }
};
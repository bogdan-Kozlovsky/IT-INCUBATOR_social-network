import { Dispatch } from 'redux';

import { profileApi } from '../../../api/profile';
import { errorProcessing } from '../../../utils/errorProcessing';
import { progressAC } from '../../actionCreator/app/actionCreators';
import { setStatusAC } from '../../actionCreator/profile/actionCreator';

export const getStatusTC = (userId: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(progressAC(false));
    const response = await profileApi.getStatus(userId);
    dispatch(setStatusAC(response.data));
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  } finally {
    dispatch(progressAC(true));
  }
};
import { Dispatch } from 'redux';

import { profileApi } from '../../../api/profile';
import { errorProcessing } from '../../../utils/errorProcessing';
import { progressAC } from '../../actionCreator/app/actionCreators';
import { setUserProfileAC } from '../../actionCreator/profile/actionCreator';

export const getUserProfileTC = (userId: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(progressAC(true));
    const response = await profileApi.getProfile(userId);
    dispatch(setUserProfileAC(response.data));
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  } finally {
    dispatch(progressAC(true));
  }
};
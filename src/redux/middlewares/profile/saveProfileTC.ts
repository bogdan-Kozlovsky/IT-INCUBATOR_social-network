import { Dispatch } from 'redux';
import { stopSubmit } from 'redux-form';

import { profileApi } from '../../../api/profile';
import { RESPONSE_NUMBER } from '../../../enums/patch';
import { errorProcessing } from '../../../utils/errorProcessing';
import { progressAC } from '../../actionCreator/app/actionCreators';
import { ProfileType } from '../../reducer/profile/types';
import { AppStateType } from '../../store';

import { getUserProfileTC } from './getUserProfileTC';

export const saveProfileTC = (profile: ProfileType) => async (dispatch: Dispatch, getState: () => AppStateType) => {
  try {
    dispatch(progressAC(false));
    const userId = getState().auth.id;
    const response = await profileApi.saveProfile(profile);
    // const response = await profile.saveProfile(profile);

    if (response.data.resultCode === RESPONSE_NUMBER.COMPLETED_SUCCESSFULLY_NUMBER) {
      // @ts-ignore
      dispatch(getUserProfileTC(userId));
    } else {
      dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
      return Promise.reject(response.data.messages[0]);
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
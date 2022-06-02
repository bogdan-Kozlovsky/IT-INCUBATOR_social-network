import { profileApi } from '../../../api/profile';
import { RESPONSE_NUMBER } from '../../../enums/patch';
import { errorProcessing } from '../../../utils/errorProcessing';
import { progressAC } from '../../actionCreator/app/actionCreators';
import { savePhotoSuccessAC } from '../../actionCreator/profile/actionCreator';
import { ThunkActionType } from '../thunkType';

import { getUserProfileTC } from './getUserProfileTC';

export const savePhotoTC = (file: any): ThunkActionType => async (dispatch) => {
  try {
    dispatch(progressAC(false));
    const response = await profileApi.savePhotoProfile(file);
    if (response.data.resultCode === RESPONSE_NUMBER.COMPLETED_SUCCESSFULLY_NUMBER) {
      await dispatch(getUserProfileTC('22141'));
      dispatch(savePhotoSuccessAC(response.data.data.photos));
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
import { Dispatch } from 'redux';

import { RESPONSE_NUMBER } from '../../../enums/patch';
import { toggleIsFollowingProgressAC } from '../../actionCreator/users/actionCreator';

export const followUnfollowFlowTC = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleIsFollowingProgressAC(true, userId));
  const response = await apiMethod(userId);
  if (response.data.resultCode === RESPONSE_NUMBER.COMPLETED_SUCCESSFULLY_NUMBER) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowingProgressAC(false, userId));
};
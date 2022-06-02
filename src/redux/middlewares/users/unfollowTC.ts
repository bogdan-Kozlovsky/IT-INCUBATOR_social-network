import { Dispatch } from 'redux';

import { usersAPI } from '../../../api/user';
import { unfollowAC } from '../../actionCreator/users/actionCreator';

import { followUnfollowFlowTC } from './followUnfollowFlowTC';

export const unfollowTC = (userId: number) => async (dispatch: Dispatch) => {
  await followUnfollowFlowTC(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowAC);
};
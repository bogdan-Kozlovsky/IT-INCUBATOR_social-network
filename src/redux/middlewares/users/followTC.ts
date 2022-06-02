import { Dispatch } from 'redux';

import { usersAPI } from '../../../api/user';
import { followAC } from '../../actionCreator/users/actionCreator';

import { followUnfollowFlowTC } from './followUnfollowFlowTC';

export const followTC = (userId: number) => async (dispatch: Dispatch) => {
  await followUnfollowFlowTC(dispatch, userId, usersAPI.follow.bind(usersAPI), followAC);
};
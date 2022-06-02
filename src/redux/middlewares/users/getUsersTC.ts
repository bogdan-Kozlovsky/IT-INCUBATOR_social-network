import { Dispatch } from 'redux';

import { usersAPI } from '../../../api/user';
import { progressAC } from '../../actionCreator/app/actionCreators';
import {
  setCurrentPageAC,
  setUsersAC,
  setUsersTotalCountAC,
  toggleIsFetchingAC,
} from '../../actionCreator/users/actionCreator';

export const getUsersTC = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(progressAC(false));
    dispatch(toggleIsFetchingAC(true));
    dispatch(setCurrentPageAC(currentPage));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsersAC(data.items));
    dispatch(setUsersTotalCountAC(data.totalCount));
  } finally {
    dispatch(progressAC(true));
    dispatch(toggleIsFetchingAC(false));
  }
};
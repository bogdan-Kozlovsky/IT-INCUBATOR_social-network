import { Dispatch } from 'redux';

import { usersAPI } from 'api/user/index';
import { RESPONSE_NUMBER } from 'enums/patch';
import { progressAC } from 'redux/reducer/app-reducer';

// type
export type UserType = {
  id: number
  photos: {
    large: null | string
    small: null | string
  }
  followed: boolean
  name: string
  status: string
}

export type UsersType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: number[]
}
const initialState: UsersType = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
};
type GlobalReducerType =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setUsersTotalCountAC>
  | ReturnType<typeof toggleIsFetchingAC>
  | ReturnType<typeof toggleIsFollowingProgressAC>

// reducer
export const usersReducer = (state: UsersType = initialState, action: GlobalReducerType): UsersType => {
  switch (action.type) {
    case 'FOLLOW':
      return { ...state, users: state.users.map(u => u.id === action.userId ? { ...u, followed: true } : u) };
    case 'UNFOLLOW':
      return { ...state, users: state.users.map(u => u.id === action.userId ? { ...u, followed: false } : u) };
    case 'SET-USER':
      return { ...state, users: [...action.users] };
    case 'SET-CURRENT-PAGE':
      return { ...state, currentPage: action.currentPage };
    case 'SET-USERS-TOTAL-COUNT':
      return { ...state, totalUsersCount: action.totalCount };
    case 'TOGGLE-IS-FETCHING':
      return { ...state, isFetching: action.isFetching };
    case 'TOGGLE-IS-FOLLOWING-PROGRESS':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId),
      };
    default:
      return state;
  }
};

// actionCreator
export const followAC = (userId: number) => ({ type: 'FOLLOW', userId } as const);
export const unfollowAC = (userId: number) => ({ type: 'UNFOLLOW', userId } as const);
export const setUsersAC = (users: Array<UserType>) => ({ type: 'SET-USER', users } as const);
export const setCurrentPageAC = (currentPage: number) => ({ type: 'SET-CURRENT-PAGE', currentPage } as const);
export const setUsersTotalCountAC = (totalCount: number) => ({ type: 'SET-USERS-TOTAL-COUNT', totalCount } as const);
export const toggleIsFetchingAC = (isFetching: boolean) => ({ type: 'TOGGLE-IS-FETCHING', isFetching } as const);
export const toggleIsFollowingProgressAC = (isFetching: boolean, userId: any) =>
  ({ type: 'TOGGLE-IS-FOLLOWING-PROGRESS', isFetching, userId } as const);

// thunk
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

const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleIsFollowingProgressAC(true, userId));
  const response = await apiMethod(userId);
  if (response.data.resultCode === RESPONSE_NUMBER.COMPLETED_SUCCESSFULLY_NUMBER) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowingProgressAC(false, userId));
};

export const followTC = (userId: number) => async (dispatch: Dispatch) => {
  await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followAC);
};
export const unfollowTC = (userId: number) => async (dispatch: Dispatch) => {
  await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowAC);
};
import {
  followAC,
  setCurrentPageAC,
  setUsersAC,
  setUsersTotalCountAC,
  toggleIsFetchingAC, toggleIsFollowingProgressAC,
  unfollowAC,
} from './actionCreator';

export type GlobalReducerType =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setUsersTotalCountAC>
  | ReturnType<typeof toggleIsFetchingAC>
  | ReturnType<typeof toggleIsFollowingProgressAC>
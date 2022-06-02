import { UserType } from '../../reducer/user/types';

export const followAC = (userId: number) =>
  ({ type: 'FOLLOW', userId } as const);

export const unfollowAC = (userId: number) =>
  ({ type: 'UNFOLLOW', userId } as const);

export const setUsersAC = (users: Array<UserType>) =>
  ({ type: 'SET-USER', users } as const);

export const setCurrentPageAC = (currentPage: number) =>
  ({ type: 'SET-CURRENT-PAGE', currentPage } as const);

export const setUsersTotalCountAC = (totalCount: number) =>
  ({ type: 'SET-USERS-TOTAL-COUNT', totalCount } as const);

export const toggleIsFetchingAC = (isFetching: boolean) =>
  ({ type: 'TOGGLE-IS-FETCHING', isFetching } as const);

export const toggleIsFollowingProgressAC = (isFetching: boolean, userId: any) =>
  ({ type: 'TOGGLE-IS-FOLLOWING-PROGRESS', isFetching, userId } as const);
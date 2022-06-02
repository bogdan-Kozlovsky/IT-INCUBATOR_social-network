import { UserType } from '../../reducer/user/types';
import { AppStateType } from '../../store';

export const selectUsers = (state: AppStateType): UserType[] => state.usersPage.users;
export const selectPageSize = (state: AppStateType): number => state.usersPage.pageSize;
export const selectTotalUsersCount = (state: AppStateType): number => state.usersPage.totalUsersCount;
export const selectCurrentPage = (state: AppStateType): number => state.usersPage.currentPage;
export const selectFollowingInProgress = (state: AppStateType): number[] => state.usersPage.followingInProgress;


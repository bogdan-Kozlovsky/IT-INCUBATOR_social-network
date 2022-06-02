import { GlobalReducerType } from '../../actionCreator/users/types';

import { UsersType } from './types';

const initialState: UsersType = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
};

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


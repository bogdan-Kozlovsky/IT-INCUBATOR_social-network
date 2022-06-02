import { v1 } from 'uuid';

import { GlobalReducerType } from '../../actionCreator/profile/types';

import { InitialType } from './types';

const initialState: InitialType = {
  posts: [
    { id: v1(), message: 'Hi,how are you', likesCount: 0 },
    { id: v1(), message: 'Hi, you', likesCount: 1 },
    { id: v1(), message: 'Hi,how are you', likesCount: 0 },
    { id: v1(), message: 'how are you', likesCount: 0 },
  ],
  profile: null,
  status: '',
};

export const profileReducer = (state: InitialType = initialState, action: GlobalReducerType): InitialType => {
  switch (action.type) {
    case 'ADD-POST':
      return {
        ...state,
        posts: [...state.posts, { id: v1(), message: action.newPostBody, likesCount: 0 }],
      };
    case 'SET-USER-PROFILE':
      return { ...state, profile: action.profile };
    case 'SET-STATUS':
      return { ...state, status: action.status };
    case 'COUNTER': {
      return {
        ...state,
        posts: [...state.posts.map(e => e.id === action.id ? { ...e, likesCount: action.likesCount } : e)],
      };
    }
    default:
      return state;
  }
};


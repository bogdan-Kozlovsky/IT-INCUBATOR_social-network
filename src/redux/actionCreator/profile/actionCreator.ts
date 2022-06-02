import { ProfileType } from '../../reducer/profile/types';

export const addPostAC = (newPostBody: string) =>
  ({ type: 'ADD-POST', newPostBody } as const);

export const counterAC = (id: string, likesCount: number) =>
  ({ type: 'COUNTER', id, likesCount } as const);

export const setUserProfileAC = (profile: ProfileType) =>
  ({ type: 'SET-USER-PROFILE', profile } as const);

export const setStatusAC = (status: string) =>
  ({ type: 'SET-STATUS', status } as const);

export const savePhotoSuccessAC = (photos: any) =>
  ({ type: 'SAVE-PHOTO-SUCCESS', photos } as const);
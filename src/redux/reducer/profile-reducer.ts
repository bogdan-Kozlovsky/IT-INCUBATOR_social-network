import { AnyAction, Dispatch } from 'redux';
import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { v1 } from 'uuid';

import { errorProcessing } from '../../utils/errorProcessing';

import { profileApi } from 'api/profile/index';
import { RESPONSE_NUMBER } from 'enums/patch';
import { progressAC } from 'redux/reducer/app-reducer';
import { AppStateType } from 'redux/store';

// type
export type ContactsPropsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}
export type PhotosPropsType = { large: string, small: string }

export type ProfileType = {
  aboutMe: string
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsPropsType
  photos: PhotosPropsType
}

export type RouteType = {
  likesCount: number
  message: string
  id: string
}
export type initialType = {
  posts: Array<RouteType>
  profile: ProfileType | null
  status: string
}
type GlobalReducerType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof setUserProfileAC>
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof counterAC>

type ThunkActionType = ThunkAction<void, AppStateType, unknown, AnyAction>

// initialState
const initialState: initialType = {
  posts: [
    { id: v1(), message: 'Hi,how are you', likesCount: 0 },
    { id: v1(), message: 'Hi, you', likesCount: 1 },
    { id: v1(), message: 'Hi,how are you', likesCount: 0 },
    { id: v1(), message: 'how are you', likesCount: 0 },
  ],
  profile: null,
  status: '',
};
//
// reduce
export const profileReducer = (state: initialType = initialState, action: GlobalReducerType): initialType => {
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
// action Creator
export const addPostAC = (newPostBody: string) => ({ type: 'ADD-POST', newPostBody } as const);
export const counterAC = (id: string, likesCount: number) => ({ type: 'COUNTER', id, likesCount } as const);
export const setUserProfileAC = (profile: ProfileType) => ({ type: 'SET-USER-PROFILE', profile } as const);
export const setStatusAC = (status: string) => ({ type: 'SET-STATUS', status } as const);
export const savePhotoSuccessAC = (photos: any) => ({
  type: 'SAVE-PHOTO-SUCCESS',
  photos,
} as const);
// thunk
export const getUserProfileTC = (userId: any) => async (dispatch: Dispatch) => {
  try {
    dispatch(progressAC(true));
    const response = await profileApi.getProfile(userId);
    dispatch(setUserProfileAC(response.data));
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  } finally {
    dispatch(progressAC(true));
  }
};
export const getStatusTC = (userId: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(progressAC(false));
    const response = await profileApi.getStatus(userId);
    dispatch(setStatusAC(response.data));
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  } finally {
    dispatch(progressAC(true));
  }

};
export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(progressAC(false));
    const response = await profileApi.updateStatusProfile(status);
    if (response.data.resultCode === RESPONSE_NUMBER.COMPLETED_SUCCESSFULLY_NUMBER) {
      dispatch(setStatusAC(status));
    }
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  } finally {
    dispatch(progressAC(true));
  }

};

// export const savePhotoTC = (file: any) => async (dispatch: Dispatch) => {
export const savePhotoTC = (file: any): ThunkActionType => async (dispatch) => {
  try {
    dispatch(progressAC(false));
    // eslint-disable-next-line no-debugger
    debugger
    const response = await profileApi.savePhotoProfile(file);
    if (response.data.resultCode === RESPONSE_NUMBER.COMPLETED_SUCCESSFULLY_NUMBER) {
      await dispatch(getUserProfileTC('22141'));
      dispatch(savePhotoSuccessAC(response.data.data.photos));
    }
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  } finally {
    dispatch(progressAC(true));
  }

};

export const saveProfileTC = (profile: ProfileType) => async (dispatch: Dispatch, getState: () => AppStateType) => {
  try {
    dispatch(progressAC(false));
    const userId = getState().auth.id;
    const response = await profileApi.saveProfile(profile);
    // const response = await profile.saveProfile(profile);

    if (response.data.resultCode === RESPONSE_NUMBER.COMPLETED_SUCCESSFULLY_NUMBER) {
      // @ts-ignore
      dispatch(getUserProfileTC(userId));
    } else {
      dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
      return Promise.reject(response.data.messages[0]);
    }
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  } finally {
    dispatch(progressAC(true));
  }

};


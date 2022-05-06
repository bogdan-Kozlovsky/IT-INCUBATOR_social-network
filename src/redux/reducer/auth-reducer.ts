import { Dispatch } from 'redux';
import { FormAction, stopSubmit } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';

import { authAPI, securityAPI } from '../../api/api';
import { ErrorFunc } from '../../common/hook/selectorHook';
import { RESPONSEFIGURES } from '../../enums/patch';
import { AppStateType } from '../redux-store';

import { initializeSuccessAC, progressAC } from './app-reducer';

// type
export type InitialStateType = {
  // id: number | null
  id: string | undefined
  email: string | null
  login: string | null
  isAuth: boolean
  captchaUrl: string | null
}
const initialState = {
  id: undefined,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};
export type GeneralType =
  | ReturnType<typeof setAuthUserDataAC>
  | ReturnType<typeof getCaptchaUrlSuccessAC>

// reducer
export const authReducer = (state: InitialStateType = initialState, action: GeneralType): InitialStateType => {
  switch (action.type) {
    case 'SET-USER-DATA':
      return { ...state, ...action.payload, isAuth: action.payload.isAuth };
    case 'GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// actionCreator
export const setAuthUserDataAC = (id: string | undefined, email: string | null, login: string | null, isAuth: boolean) => ({
  type: 'SET-USER-DATA',
  payload: {
    id, email, login, isAuth,
  },
} as const);

export const getCaptchaUrlSuccessAC = (captchaUrl: string) => ({
  type: 'GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl },
} as const);

// thunk
export const getAuthUserDataThunk = () => async (dispatch: Dispatch) => {
  try {
    dispatch(progressAC(false));
    const response = await authAPI.me();

    if (response.data.resultCode === RESPONSEFIGURES.zeroRequest) {
      const { id, email, login } = response.data.data;
      dispatch(setAuthUserDataAC(id, email, login, true));
      dispatch(initializeSuccessAC(true));
    }
    const number = 1;
    if (response.data.resultCode === number) {
      ErrorFunc(response.data.messages[0], dispatch);
    }
  } catch (error) {
    dispatch(initializeSuccessAC(true));
    if (error instanceof Error) {
      const { name } = error;
      ErrorFunc(name, dispatch);
    }
  } finally {
    dispatch(progressAC(true));
  }
};

export const getCaptchaUrlTC = () => async (dispatch: Dispatch) => {
  try {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccessAC(captchaUrl));
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      ErrorFunc(name, dispatch);
    }
  }
};

// type ThunkType = ThunkAction<void, AppStateType, Dispatch<GeneralType>, GeneralType>

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: ThunkDispatch<AppStateType, unknown, FormAction>) => {
  try {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === RESPONSEFIGURES.zeroRequest) {
      await dispatch(getAuthUserDataThunk());
    } else if (response.data.resultCode === RESPONSEFIGURES.tenRequest) {
      await dispatch(getCaptchaUrlTC());
    } else {
      const minNumber = 0;
      const message = response.data.messages.length > minNumber ? response.data.messages[0] : 'Some error';
      dispatch(stopSubmit('login', { _error: message }));
    }
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      ErrorFunc(name, dispatch);
    }
  }
};

export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    const response = await authAPI.logout();
    if (response.data.resultCode === RESPONSEFIGURES.zeroRequest) {
      dispatch(setAuthUserDataAC(undefined, null, null, false));
      dispatch(initializeSuccessAC(true));
    }
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      ErrorFunc(name, dispatch);
    }
  }
};


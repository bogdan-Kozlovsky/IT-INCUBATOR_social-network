import { Dispatch } from 'redux';
import { stopSubmit } from 'redux-form';

import { errorProcessing } from '../../utils/errorProcessing';

import { authApi } from 'api/auth/index';
import { securityApi } from 'api/security/index';
import { RESPONSE_NUMBER } from 'enums/patch';
import { initializeSuccessAC, progressAC } from 'redux/reducer/app-reducer';
import { ThunkType } from 'types/thunkType';

// type
export type InitialStateType = {
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
    const response = await authApi.me();
    if (response.data.resultCode === RESPONSE_NUMBER.COMPLETED_SUCCESSFULLY_NUMBER) {
      const { id, email, login } = response.data.data;
      dispatch(setAuthUserDataAC(id, email, login, true));
      dispatch(initializeSuccessAC(true));
    }
    const number = 1;
    if (response.data.resultCode === number) {
      dispatch(initializeSuccessAC(true));
      errorProcessing(response.data.messages[0], dispatch);
    }
  } catch (error) {
    dispatch(initializeSuccessAC(true));
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  } finally {
    dispatch(progressAC(true));
  }
};

export const getCaptchaUrlTC = () => async (dispatch: Dispatch) => {
  try {
    const response = await securityApi.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccessAC(captchaUrl));
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  }
};

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  try {
    const response = await authApi.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === RESPONSE_NUMBER.COMPLETED_SUCCESSFULLY_NUMBER) {
      await dispatch(getAuthUserDataThunk());
    }
    if (response.data.resultCode === RESPONSE_NUMBER.REDIRECT_TO_CAPTCHA) {
      await dispatch(getCaptchaUrlTC());
    }
    const minNumber = 0;
    const message = response.data.messages.length > minNumber ? response.data.messages[0] : 'Some error';
    dispatch(stopSubmit('login', { _error: message }));
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  }
};

export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    const response = await authApi.logout();
    if (response.data.resultCode === RESPONSE_NUMBER.COMPLETED_SUCCESSFULLY_NUMBER) {
      dispatch(setAuthUserDataAC(undefined, null, null, false));
      dispatch(initializeSuccessAC(true));
    }
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;
      errorProcessing(name, dispatch);
    }
  }
};


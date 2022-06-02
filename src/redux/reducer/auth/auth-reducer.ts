import { GeneralType } from '../../actionCreator/auth/types';

import { InitialStateType } from './types';

const initialState = {
  id: undefined,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

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


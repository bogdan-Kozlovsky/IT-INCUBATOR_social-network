import { getCaptchaUrlSuccessAC, setAuthUserDataAC } from './actionCreators';

export type GeneralType =
  | ReturnType<typeof setAuthUserDataAC>
  | ReturnType<typeof getCaptchaUrlSuccessAC>
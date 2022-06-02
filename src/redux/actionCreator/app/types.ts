import { errorAC, initializeSuccessAC, progressAC } from './actionCreators';

export type GeneralType =
  ReturnType<typeof initializeSuccessAC>
  | ReturnType<typeof errorAC>
  | ReturnType<typeof progressAC>
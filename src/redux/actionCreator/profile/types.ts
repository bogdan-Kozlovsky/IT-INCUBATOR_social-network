import { addPostAC, counterAC, setStatusAC, setUserProfileAC } from './actionCreator';

export type GlobalReducerType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof setUserProfileAC>
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof counterAC>
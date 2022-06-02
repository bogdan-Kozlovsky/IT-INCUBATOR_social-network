import { sendMessageAC } from './actionCreator';

export type GlobalReducerType = | ReturnType<typeof sendMessageAC>

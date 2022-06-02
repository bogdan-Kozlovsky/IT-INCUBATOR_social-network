import { GlobalReducerType } from '../../actionCreator/dialogs/types';

import { InitialStateType } from './types';

const initialState: InitialStateType = {
  dialogs: [
    { id: 1, name: 'Slava' },
    { id: 2, name: 'Borya' },
    { id: 3, name: 'Igor' },
    { id: 4, name: 'Viktor' },
  ],
  messages: [
    { id: 1, message: 'Hi how are you doing' },
    { id: 2, message: 'I heard that you have problems' },
    { id: 3, message: 'how is your health today' },
    { id: 4, message: 'Where had you been?' },
  ],
};

export const dialogsReducer = (state: InitialStateType = initialState, action: GlobalReducerType): InitialStateType => {
  switch (action.type) {
    case  'SEND-MESSAGE':
      return { ...state, messages: [...state.messages, { id: 6, message: action.newMessageBody }] };
    default:
      return state;
  }
};


import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppStateType } from '../redux/store';

export type ThunkType = ThunkAction<void, AppStateType, unknown, AnyAction>
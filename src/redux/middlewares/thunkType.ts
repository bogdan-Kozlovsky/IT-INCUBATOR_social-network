import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppStateType } from '../store';

export type ThunkActionType = ThunkAction<void, AppStateType, unknown, AnyAction>
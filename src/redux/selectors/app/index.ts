import { AppStateType } from '../../store';

export const selectIsProgress = (state: AppStateType): boolean => state.app.isProgress;
export const selectIsInitialized = (state: AppStateType): boolean => state.app.isInitialized;
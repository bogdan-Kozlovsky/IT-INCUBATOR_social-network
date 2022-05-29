import { AppStateType } from '../../store';

export const selectErrorMessage = (state: AppStateType): string | null => state.app.errorMessage;
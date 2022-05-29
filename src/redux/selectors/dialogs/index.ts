import { DialogType, PostsType } from '../../reducer/dialogs-reducer';
import { AppStateType } from '../../store';

export const selectDialogs = (state: AppStateType): PostsType[] => state.dialogsPage.dialogs;
export const selectMessage = (state: AppStateType): DialogType[] => state.dialogsPage.messages;


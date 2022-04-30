import {AppStateType} from "./redux-store";

//auth
export const selectIsAuth = (state: AppStateType) =>  state.auth

//dialogs
export const selectDialogs = (state: AppStateType) =>  state.dialogsPage

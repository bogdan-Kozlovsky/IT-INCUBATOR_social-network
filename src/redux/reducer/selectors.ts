import { AppStateType } from '../redux-store';

// auth
export const selectIsAuth = (state: AppStateType) => state.auth;

// dialogs
export const selectDialogs = (state: AppStateType) => state.dialogsPage;

// app
export const selectInitialized = (state: AppStateType) => state.app;

// profile
export const selectProfile = (state: AppStateType) => state.profilePage;

// users
export const selectUsers = (state: AppStateType) => state.usersPage;

// error
export const selectError = (state: AppStateType) => state.app.error;


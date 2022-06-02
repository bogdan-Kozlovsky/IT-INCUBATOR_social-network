import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import { appReducer } from './reducer/app/app-reducer';
import { authReducer } from './reducer/auth/auth-reducer';
import { dialogsReducer } from './reducer/dialogs/dialogs-reducer';
import { profileReducer } from './reducer/profile/profile-reducer';
import { usersReducer } from './reducer/user/users-reducer';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
});
export type AppStateType = ReturnType<typeof reducers>

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

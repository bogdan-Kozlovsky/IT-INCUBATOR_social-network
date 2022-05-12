import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import { appReducer } from './reducer/app-reducer';
import { authReducer } from './reducer/auth-reducer';
import { dialogsReducer } from './reducer/dialogs-reducer';
import { profileReducer } from './reducer/profile-reducer';
import { usersReducer } from './reducer/users-reducer';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});
export type AppStateType = ReturnType<typeof reducers>

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
// export const store = createStore(reducers, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch;
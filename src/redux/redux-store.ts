import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./reducer/profile-reducer";
import {dialogsReducer} from "./reducer/dialogs-reducer";
import {usersReducer} from "./reducer/users-reducer";
import {authReducer} from "./reducer/auth-reducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import {appReducer} from "./reducer/app-reducer";
import {composeWithDevTools} from "redux-devtools-extension";


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})
export type AppStateType = ReturnType<typeof reducers>

export let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
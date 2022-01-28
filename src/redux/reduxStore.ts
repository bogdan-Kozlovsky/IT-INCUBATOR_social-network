import {dialogsReducer} from "./dialogsReducer";
import {profileReducer} from "./profileReducer";
import {combineReducers, createStore} from "redux";

export let reducers= combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
})

export let store = createStore(reducers)
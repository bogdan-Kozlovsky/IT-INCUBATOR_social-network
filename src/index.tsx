import React from 'react'
import './index.scss'
import './normalize.scss'
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";
import {RootStateType, store, StoreType} from "./redux/state";

export let rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state}
                 dispatch={store.dispatch.bind(store)}
            />
        </BrowserRouter>, document.getElementById('root'))
}
rerenderEntireTree(store.getState())

store.subscribe(rerenderEntireTree)

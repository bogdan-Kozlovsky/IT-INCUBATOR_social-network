import React from 'react'
import './index.scss'
import './normalize.scss'
import {addPost, RootStateType, state, subscribe, updateNewPostText} from './redux/state';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";

export let rerenderEntireTree = (state:RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
        </BrowserRouter>, document.getElementById('root'))
}
rerenderEntireTree(state)

subscribe(rerenderEntireTree)

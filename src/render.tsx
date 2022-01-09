import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './App'
import './index.scss'
import './normalize.scss'
import {BrowserRouter} from 'react-router-dom';
import {addPost, RootStateType, updateNewPostText} from './redux/state';

export let rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
        </BrowserRouter>, document.getElementById('root'))
}


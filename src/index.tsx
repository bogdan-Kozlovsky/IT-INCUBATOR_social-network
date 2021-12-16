import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './App'
import reportWebVitals from './reportWebVitals'
import './index.scss'
import './normalize.scss'
import {BrowserRouter} from "react-router-dom";
import {state} from './redux/redux';


ReactDOM.render(
    <BrowserRouter>
        <App state={state}/>
    </BrowserRouter>,
document.getElementById('root')
)
reportWebVitals()

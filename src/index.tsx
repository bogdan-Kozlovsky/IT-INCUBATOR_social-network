import React from 'react'
import './index.scss'
import './normalize.scss'
import {rerenderEntireTree} from './render';
import {state} from './redux/state';


rerenderEntireTree(state)

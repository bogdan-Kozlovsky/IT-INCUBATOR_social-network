import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {HashRouter, Route, Routes} from "react-router-dom";
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {Navigation} from "./components/Navigation/Navigation";
import {UsersContainer} from "./components/Users/UsersContainer";



const App: React.FC = (props) => {

    return (
        <HashRouter>
            <Header/>
            <div className='app-wrapper'>
                <Navigation/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/*' element={<ProfileContainer/>}/>
                        <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                        <Route path='/users/*' element={<UsersContainer/>}/>
                        <Route path='/news' element={<h2>News</h2>}/>
                        <Route path='/music' element={<h2>Music</h2>}/>
                        <Route path='/settings' element={<h2>Settings</h2>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    );
}

export default App;


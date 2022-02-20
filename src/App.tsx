import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {Navigation} from "./components/Navigation/Navigation";
import {UsersContainer} from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";


const App: React.FC = (props) => {

    return (
        <BrowserRouter>
            <HeaderContainer/>
            <div className='app-wrapper'>
                <Navigation/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='profile/' element={<ProfileContainer/>}/>
                        <Route path='profile/:userId' element={<ProfileContainer/>}/>
                        <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                        <Route path='/users/*' element={<UsersContainer/>}/>
                        <Route path='/news' element={<h2>News</h2>}/>
                        <Route path='/music' element={<h2>Music</h2>}/>
                        <Route path='/settings' element={<h2>Settings</h2>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;


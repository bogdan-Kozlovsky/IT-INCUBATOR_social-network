import React, {useEffect} from 'react';
import {Header} from "./components/Header/Header";
import {Navigation} from "./components/Navigation/Navigation";
import {Route, Routes} from "react-router-dom";
import {Dialogs} from "./components/Dialogs/Dialogs";
import Login from "./components/Login/Login";
import {initializeAppTC} from "./redux/app-reducer";
import {Preloader} from "./common/preloader/Preloader";
import {useAppSelector} from "./common/hook/selectorHook";
import {selectInitialized} from "./redux/selectors";
import {useDispatch} from "react-redux";
import {Profile} from "./components/Profile/Profile";
import {Users} from "./components/Users/Users";

export const App = () => {
    const dispatch = useDispatch()
    const initialized = useAppSelector(selectInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!initialized) {
        return <Preloader/>
    }
    return (
        <>
            <Header/>
            <div className='app-wrapper'>
                <Navigation/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='profile/' element={<Profile/>}/>
                        <Route path='profile/:userId' element={<Profile/>}/>
                        <Route path='/dialogs/*' element={<Dialogs/>}/>
                        <Route path='/users/*' element={<Users/>}/>
                        <Route path='/news' element={<h2>News</h2>}/>
                        <Route path='/music' element={<h2>Music</h2>}/>
                        <Route path='/settings' element={<h2>Settings</h2>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        </>
    );
};

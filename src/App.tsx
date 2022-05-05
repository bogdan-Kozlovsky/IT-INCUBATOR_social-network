import React, {useEffect} from 'react';
import {Header} from "./components/Header/Header";
import {Navigation} from "./components/Navigation/Navigation";
import {Route, Routes} from "react-router-dom";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {Login} from "./components/Login/Login";
import {useAppSelector} from "./common/hook/selectorHook";
import {selectError, selectInitialized} from "./redux/reducer/selectors";
import {Profile} from "./components/Profile/Profile";
import {Users} from "./components/Users/Users";
import {Me} from "./components/Me/Me";
import {useDispatch} from "react-redux";
import {Error} from "./common/Error/Error";
import {PATH} from "./enums/patch";
import {getAuthUserDataThunk} from "./redux/reducer/auth-reducer";

export const App = () => {

    const dispatch = useDispatch()
    const error = useAppSelector(selectError)
    const {progress} = useAppSelector(selectInitialized)


    useEffect(() => {
        dispatch(getAuthUserDataThunk())
    }, [])

    return (
        <>
            <Header/>
            {error && <Error/>}
            {!progress && <div className='nav'>
                <div className='statusBar'></div>
            </div>}
            <div className='app-wrapper'>
                <Navigation/>
                <Routes>
                    <Route path={PATH.ME} element={<Me/>}/>
                    <Route path={`${PATH.PROFILE}/:userId`} element={<Profile/>}/>
                    <Route path={PATH.DIALOGS} element={<Dialogs/>}/>
                    <Route path={PATH.USERS} element={<Users/>}/>
                    <Route path={PATH.LOGIN} element={<Login/>}/>
                    <Route path={'/*'} element={<div>error</div>}/>
                </Routes>
            </div>
        </>
    );
};

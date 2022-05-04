import React, {useEffect} from 'react';
import {Header} from "./components/Header/Header";
import {Navigation} from "./components/Navigation/Navigation";
import {Route, Routes} from "react-router-dom";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {Login} from "./components/Login/Login";
import {Preloader} from "./common/preloader/Preloader";
import {useAppSelector} from "./common/hook/selectorHook";
import {selectError, selectInitialized} from "./redux/selectors";
import {Profile} from "./components/Profile/Profile";
import {Users} from "./components/Users/Users";
import {Me} from "./components/Me/Me";
import {useDispatch} from "react-redux";
import {Error} from "./common/Error/Error";
import {PATH} from "./enums/patch";
import {getAuthUserDataThunk} from "./redux/auth-reducer";

export const App = () => {

    const dispatch = useDispatch()
    const initialized = useAppSelector(selectInitialized)
    const error = useAppSelector(selectError)

    useEffect(() => {
        dispatch(getAuthUserDataThunk())
    }, [])

    // if (!initialized) {
    if (false) {
        return <Preloader/>
    }
    return (
        <>
            <Header/>
            {error && <Error/>}
            <div className='app-wrapper'>
                <Navigation/>
                <>
                    <Routes>
                        <Route path={PATH.ME} element={<Me/>}/>
                        <Route path={`${PATH.PROFILE}/:userId`} element={<Profile/>}/>
                        {/*<Route path='profile/:userId' element={<Profile/>}/>*/}
                        <Route path={PATH.DIALOGS} element={<Dialogs/>}/>
                        <Route path={PATH.USERS} element={<Users/>}/>
                        <Route path={PATH.LOGIN} element={<Login/>}/>
                        <Route path={'/*'} element={<div>error</div>}/>
                    </Routes>
                </>
            </div>
        </>
    );
};

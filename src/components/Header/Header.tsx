import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../common/hook/selectorHook";
import {selectIsAuth} from "../../redux/selectors";
import {logoutTC} from "../../redux/auth-reducer";
import {useDispatch} from "react-redux";

export const Header = () => {
    const dispatch = useDispatch()
    const {isAuth, login} = useAppSelector(selectIsAuth)

    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <header className={s.header}>
            <div style={{width: '1200px', margin: '0 auto', padding: '10px'}}>
                <img
                    src='http://pngimg.com/uploads/magic_hat/small/magic_hat_PNG102.png' alt={'img'}/>
            </div>
            <div className={s.loginBlock}>

                {isAuth
                    ? <div>{login} - <button onClick={logoutHandler}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

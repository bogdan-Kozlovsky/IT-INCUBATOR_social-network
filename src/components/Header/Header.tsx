import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {InitialStateType} from "../../redux/auth-reducer";

type HeaderPropsType = {
    auth: InitialStateType
}
export const Header = ({...props}: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <div style={{width: '1200px', margin: '0 auto', padding: '10px'}}>
                <img
                    src='http://pngimg.com/uploads/magic_hat/small/magic_hat_PNG102.png' alt={'img'}/>
            </div>
            <div className={s.loginBlock}>
                {props.auth.isAuth ? props.auth.login : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

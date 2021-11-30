import React, {FC} from 'react';
import style from './header.module.scss'
import logo from './../../img/logo.svg'

export const Header:FC = () => {
    return (
        <div className={style.header}>
            <div className="wrapper">
                <a href="#">
                    <img className={style.header__logo} src={logo} alt="logo"/>
                </a>
            </div>
        </div>
    );
};


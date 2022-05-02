import React, {FC} from 'react';
import s from './navigation.module.scss'
import cn from 'classnames'
import {NavLink} from 'react-router-dom';


export const Navigation = () => {
    return (
        <div>
            <ul className={cn(s.navigation__items, s.navigation)}>
                <li className={s.navigation__item}>
                    <NavLink
                        className={({isActive}) => `${s.navigation__link} ${isActive ? s.navigation__active : ''}`}
                        to="/">
                        Me
                    </NavLink>
                </li>
                <li className={s.navigation__item}>
                    <NavLink
                        className={({isActive}) => `${s.navigation__link} ${isActive ? s.navigation__active : ''}`}
                        to="/dialogs">
                        Messages
                    </NavLink>
                </li>

                <li className={s.navigation__item}>
                    <NavLink
                        className={({isActive}) => `${s.navigation__link} ${isActive ? s.navigation__active : ''}`}
                        to="/users">
                        Users
                    </NavLink>
                </li>

                <li className={s.navigation__item}>
                    <NavLink
                        className={({isActive}) => `${s.navigation__link} ${isActive ? s.navigation__active : ''}`}
                        to="/news">
                        News
                    </NavLink>
                </li>

                <li className={s.navigation__item}>
                    <NavLink
                        className={({isActive}) => `${s.navigation__link} ${isActive ? s.navigation__active : ''}`}
                        to="/music">
                        Music
                    </NavLink>
                </li>

                <li className={s.navigation__item}>
                    <NavLink
                        className={({isActive}) => `${s.navigation__link} ${isActive ? s.navigation__active : ''}`}
                        to={"/settings"}
                    >
                        Settings
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};
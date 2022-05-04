import React from 'react';
import s from './navigation.module.scss'
import cn from 'classnames'
import {NavLink} from 'react-router-dom';
import {PATH} from "../../enums/patch";


export const Navigation = () => {
    return (
        <div>
            <ul className={cn(s.navigation__items, s.navigation)}>
                <li className={s.navigation__item}>
                    <NavLink
                        className={({isActive}) => `${s.navigation__link} ${isActive ? s.navigation__active : ''}`}
                        to={PATH.ME}>
                        Me
                    </NavLink>
                </li>
                <li className={s.navigation__item}>
                    <NavLink
                        className={({isActive}) => `${s.navigation__link} ${isActive ? s.navigation__active : ''}`}
                        to={PATH.DIALOGS}>
                        Messages
                    </NavLink>
                </li>

                <li className={s.navigation__item}>
                    <NavLink
                        className={({isActive}) => `${s.navigation__link} ${isActive ? s.navigation__active : ''}`}
                        to={PATH.USERS}>
                        Users
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};
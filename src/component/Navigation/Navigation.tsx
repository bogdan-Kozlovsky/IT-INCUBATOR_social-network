import React, {FC} from 'react';
import style from './navigation.module.scss'
import cn from 'classnames'
import {NavLink} from 'react-router-dom';
// import './../../index.scss'


const activeStyle: any = {
    color: 'red',
    transition: 'all 0.7s',
    fontWeight: '500',
    fontSize: '22px'
}


export const Navigation: FC = () => {
    return (
        <div>
            <ul className={cn(style.navigation__items, style.navigation)}>
                <li className={style.navigation__item}>
                    <NavLink
                        className={cn(style.navigation__link)} to="/profile"
                        style={({isActive}) => isActive ? activeStyle : undefined}
                    >
                        Profile
                    </NavLink>
                </li>

                <li className={style.navigation__item}>
                    <NavLink
                        className={cn(style.navigation__link)} to="/dialogs"
                        style={({isActive}) => isActive ? activeStyle : undefined}
                    >
                        Messages
                    </NavLink>
                </li>

                <li className={style.navigation__item}>
                    <NavLink
                        className={cn(style.navigation__link)} to="/news"
                        style={({isActive}) => isActive ? activeStyle : undefined}
                    >
                        News
                    </NavLink>
                </li>

                <li className={style.navigation__item}>
                    <NavLink
                        className={cn(style.navigation__link)} to="/music"
                        style={({isActive}) => isActive ? activeStyle : undefined}
                    >
                        Music
                    </NavLink>
                </li>

                <li className={style.navigation__item}>
                    <NavLink
                        className={cn(style.navigation__link)} to="/settings"
                        style={({isActive}) => isActive ? activeStyle : undefined}
                    >
                        Settings
                    </NavLink>

                </li>
            </ul>
        </div>
    );
};

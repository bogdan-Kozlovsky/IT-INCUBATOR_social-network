import React, {FC} from 'react';
import style from './navigation.module.scss'
import cn from 'classnames'
import { NavLink } from 'react-router-dom';

export const Navigation: FC = () => {
    return (
        <div >
            <ul className={cn(style.navigation__items,style.navigation)}>
                <li className={style.navigation__item}>
                    <NavLink className={style.navigation__link} to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li className={style.navigation__item}>
                    <NavLink className={style.navigation__link} to="/dialogs">
                        Messages
                    </NavLink>
                </li>
                <li className={style.navigation__item}>
                    <a className={style.navigation__link} href="#">
                        News
                    </a>
                </li>
                <li className={style.navigation__item}>
                    <a className={style.navigation__link} href="#">
                        Music
                    </a>
                </li>
                <li className={style.navigation__item}>
                    <a className={style.navigation__link} href="#">
                        Settings
                    </a>
                </li>
            </ul>
        </div>
    );
};

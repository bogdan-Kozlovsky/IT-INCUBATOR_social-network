import React, {FC} from 'react';
import style from './navigation.module.scss'
import cn from 'classnames'

export const Navigation: FC = () => {
    return (
        <div >
            <ul className={cn(style.navigation__items,style.navigation)}>
                <li className={style.navigation__item}>
                    <a className={style.navigation__link} href="#">
                        Profile
                    </a>
                </li>
                <li className={style.navigation__item}>
                    <a className={style.navigation__link} href="#">
                        Messages
                    </a>
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

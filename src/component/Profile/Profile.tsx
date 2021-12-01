import React from 'react';
import style from './profile.module.scss'
import banner from './../../img/banner.jpg'
import avatar from './../../img/avatar.jpg'
import {MyPost} from "./MyPost/MyPost";

export const Profile = () => {
    return (
        <div className={style.profile}>
            <img className={style.profile__banner} src={banner} alt="banner"/>
            <div className={style.profile__inner}>
                <img className={style.profile__avatar} src={avatar} alt="avatar"/>
                <div className={style.profile__descr}>
                    <h2 className={style.profile__name}>Bogdan Kozlovsky</h2>
                    <ul className={style.profile__list}>
                        <li className={style.profile__item}>
                            Country:<span>Ukraine</span></li>
                        <li className={style.profile__item}>
                            City: <span>Vinnytsia</span></li>
                        <li className={style.profile__item}>
                            Age: <span>22</span></li>
                    </ul>
                </div>
            </div>


            <MyPost/>
        </div>
    );
};


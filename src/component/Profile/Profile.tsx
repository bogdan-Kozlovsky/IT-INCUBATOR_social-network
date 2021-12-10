import React from 'react';
import style from './profile.module.scss'
import banner from './../../img/banner.jpg'
import {MyPost} from "./MyPost/MyPost";
import {ProfileInfo} from "./ProfileInfo";
import {ProfileDescr} from "./ProfileDescr";


export const Profile = () => {
    return (
        <div className={style.profile}>
            <img className={style.profile__banner} src={banner} alt="banner"/>
            <div className={style.profile__inner}>
                <ProfileInfo
                    url={'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}/>

                <ProfileDescr
                    name={'Bogdan Kozlovsky'} country={'Ukraine'} city={'Vinnytsia'} age={22}/>

            </div>


            <MyPost/>
        </div>
    );
};


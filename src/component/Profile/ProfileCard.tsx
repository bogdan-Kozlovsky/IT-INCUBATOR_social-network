import React, {FC} from 'react';
import style from './profile.module.scss'
import {PostsType} from '../../redux/redux';


type ProfileCardType = {
    posts: Array<PostsType>
}


export const ProfileCard: FC<ProfileCardType> = (props) => {
    return (
        <div className={style.profile__descr}>
            {props.posts.map(el => {
                return (
                    <div className={style.profile__inner}>
                        <img className={style.profile__avatar} src={el.ava} alt="avatar"/>
                        <div>
                            <h2 className={style.profile__name}>{el.name}</h2>
                            <ul className={style.profile__list}>
                                <li className={style.profile__item}>
                                    Country:<span>{el.country}</span>
                                </li>
                                <li className={style.profile__item}>
                                    City: <span>{el.city}</span></li>
                                <li className={style.profile__item}>
                                    Age: <span>{el.age}</span></li>
                            </ul>
                        </div>
                    </div>
                )
            })}

        </div>
    );
};


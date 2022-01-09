import React, {FC} from 'react';
import style from './profile.module.scss'
import {PostsType} from '../../redux/state';


type ProfileCardType = {
    posts: Array<PostsType>
}


export const ProfileCard: FC<ProfileCardType> = (props) => {
    return (
        <div className={style.profile__descr}>
            {props.posts.map((el, index) => {
                return (
                    <div key={index} className={style.profile__inner}>
                        <img className={style.profile__avatar} src={el.ava} alt="avatar"/>
                        <div>
                            <h2 className={style.profile__name}>{el.name}</h2>
                        </div>
                    </div>
                )
            })}

        </div>
    );
};


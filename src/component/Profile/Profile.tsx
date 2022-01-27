import React, {FC} from 'react';
import s from './profile.module.scss'
import banner from './../../img/banner.jpg'
import {MyPost} from './MyPost/MyPost';

import {AddPostActionType, PostsType, UpdateNewPostActionType} from '../../redux/state';
import {ProfileCard} from './ProfileCard';

type ProfileType = {
    posts: Array<PostsType>
    newPostText: string
    dispatch: (action: AddPostActionType | UpdateNewPostActionType) => void
}

export const Profile = ({posts, newPostText, ...props}: ProfileType) => {
    return (
        <div className={s.profile}>
            <img className={s.profile__banner} src={banner} alt="banner"/>
            <div>
                <ProfileCard posts={posts}/>
            </div>


            <MyPost newPostText={newPostText} dispatch={props.dispatch}/>
        </div>
    );
};


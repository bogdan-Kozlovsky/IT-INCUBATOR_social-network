import React, {FC} from 'react';
import s from './profile.module.scss'
import banner from './../../img/banner.jpg'
import {MyPost} from './MyPost/MyPost';

import {PostsType} from '../../redux/state';
import {ProfileCard} from './ProfileCard';

type ProfileType = {
    posts: Array<PostsType>
    addPost: () => void
    newPostText:string
    updateNewPostText: (newPostText: string ) => void
}

export const Profile: FC<ProfileType> = ({posts, addPost,newPostText,...props}) => {
    return (
        <div className={s.profile}>
            <img className={s.profile__banner} src={banner} alt="banner"/>
            <div>
                <ProfileCard posts={posts} />
            </div>


            <MyPost addPost={addPost} newPostText={newPostText} updateNewPostText={props.updateNewPostText}/>
        </div>
    );
};


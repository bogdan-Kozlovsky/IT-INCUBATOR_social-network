import React from 'react';
import style from "../profile.module.scss";
import {Post} from "./Post/Post";

export const MyPost = () => {
    return (
        <div className={style.post}>
            <h1 className={style.post__title}>My Post</h1>
            <textarea className={style.post__textarea} placeholder='Введите свои записы'/>
            <Post
                id={1} author={'Vasia'} descr={'Hello how are you'}
            />
            <Post
                id={2} author={'Vlad'} descr={'Hello, I haven\'t singled out you for a long time'}
            />
        </div>
    );
};


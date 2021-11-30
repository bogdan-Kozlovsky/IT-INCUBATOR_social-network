import React from 'react';
import style from "../profile.module.scss";

export const MyPost = () => {
    return (
        <div className={style.post}>
            <h1 className={style.post__title}>My Post</h1>
            <textarea className={style.post__textarea} placeholder='Введите свои записы'/>
        </div>
    );
};


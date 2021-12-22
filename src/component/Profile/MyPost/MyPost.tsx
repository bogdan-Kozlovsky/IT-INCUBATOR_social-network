import React from 'react';
import s from '../profile.module.scss';
import {Post} from './Post/Post';

export const MyPost = () => {

    const addPost = () => {
        let text = newPostElement.current?.value
        console.log(text)
    }

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    return (
        <div className={s.post}>
            <h1 className={s.post__title}>My Post</h1>
            <textarea
                ref={newPostElement}
                className={s.post__textarea}
                placeholder="Введите свои записы"
            />
            <button onClick={addPost} className={s.post__btn}>Add post</button>
            <Post
                id={1} author={'Vasia'} descr={'Hello how are you'}
            />
            <Post
                id={2} author={'Vlad'} descr={'Hello, I haven\'t singled out you for a long time'}
            />
        </div>
    );
};


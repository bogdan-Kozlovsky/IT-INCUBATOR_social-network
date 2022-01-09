import React, {FC} from 'react';
import s from '../profile.module.scss';
import {Post} from './Post/Post';


type MyPostPropsType = {
    addPost: () => void
    newPostText: string
    updateNewPostText: (newPostText: any) => void
}
export const MyPost: FC<MyPostPropsType> = (props) => {


    const addTaskPost = () => {
        // let text = newPostElement.current?.value
        // props.addPost(text)
        props.addPost()
    }

    const onPostChange = () => {
        let text = newPostElement.current?.value
        props.updateNewPostText(text)
    }
    let newPostElement = React.createRef<HTMLTextAreaElement>();

    return (
        <div className={s.post}>
            <h1 className={s.post__title}>My Post</h1>
            <textarea
                onChange={onPostChange}
                value={props.newPostText}
                ref={newPostElement}
                className={s.post__textarea}
                placeholder="Введите свои записы"
            />
            <button className={s.post__btn} onClick={addTaskPost}>Add post
            </button>
            <Post
                id={1} author={'Vasia'} descr={'Hello how are you'}
            />
            <Post
                id={2} author={'Vlad'} descr={'Hello, I haven\'t singled out you for a long time'}
            />
        </div>
    );
};








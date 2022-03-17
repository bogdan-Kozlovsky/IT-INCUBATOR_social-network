import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import React from "react";
import {MyPostPropsType} from "./MyPostContainers";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {Textarea} from "../../../common/FromControls/FormControls";

type AddPostFormType = {
    newPostBody: string
}

export const MyPosts = (props: MyPostPropsType) => {
    let post = props.posts.map(({id, message, likesCount}) => (
        <React.Fragment key={id}>
            <Post message={message} likesCount={likesCount}/>
        </React.Fragment>))

    const addNewPost = (values: AddPostFormType) => {
        props.addPost(values.newPostBody)
    }

    return (
        <div className={s.myposts}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <AddPostFormRedux onSubmit={addNewPost}/>
                </div>
            </div>
            <div className={s.posts}>
                {post}
            </div>
        </div>
    )
}


const maxLength10 = maxLengthCreator(10);
const AddPostForm: React.FC<InjectedFormProps<AddPostFormType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                validate={[required, maxLength10]}
                component={Textarea}
                style={{resize: 'none'}}
                name='newPostBody'
                placeholder='Enter your post'
            />
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm<AddPostFormType>({form: 'postAddForm'})(AddPostForm)
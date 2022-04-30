import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import React, {memo} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {Textarea} from "../../../common/FromControls/FormControls";
import {useAppSelector} from "../../../common/hook/selectorHook";
import {selectProfile} from "../../../redux/selectors";
import {useDispatch} from "react-redux";
import {addPostAC} from "../../../redux/profile-reducer";

type AddPostFormType = {
    newPostBody: string
}

export const MyPosts = memo(() => {
    const dispatch = useDispatch()
    const {posts} = useAppSelector(selectProfile)

    let post = posts.map(({id, message, likesCount}) => (
        <div key={id}>
            <Post message={message} likesCount={likesCount}/>
        </div>))

    const addNewPost = (values: AddPostFormType) => {
        dispatch(addPostAC(values.newPostBody))
    }

    return (
        <div className={s.myPosts}>
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
})


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
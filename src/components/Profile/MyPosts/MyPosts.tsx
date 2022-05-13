import React, { memo } from 'react';

import { useDispatch } from 'react-redux';
import { Field, InjectedFormProps, reduxForm, reset } from 'redux-form';

import s from './MyPosts.module.css';

import { Textarea } from 'common/FromControls/FormControls';
import { useAppSelector } from 'common/hook/selectorHook';
import { Post } from 'components/Profile/MyPosts/Post/Post';
import { addPostAC } from 'redux/reducer/profile-reducer';
import { selectProfile } from 'redux/reducer/selectors';
import { maxLengthCreator, required } from 'utils/validators';

type AddPostFormType = {
  newPostBody: string
}

export const MyPosts = memo(() => {
  const dispatch = useDispatch();
  const { posts } = useAppSelector(selectProfile);

  const post = posts.map(({ id, message, likesCount }) => (
    <div key={`${id}${likesCount}`}>
      <Post message={message} likesCount={likesCount} id={id} />
    </div>));

  const addNewPost = (values: AddPostFormType) => {
    dispatch(addPostAC(values.newPostBody));
    dispatch(reset('postAddForm'));
  };

  return (
    <div className={s.myPosts}>
      <h3 className={s.subtitle}>My Posts</h3>
      <div>
        <AddPostFormRedux onSubmit={addNewPost} />
      </div>
      <div className={s.posts}>
        {post}
      </div>
    </div>
  );
});

const maxLength10 = maxLengthCreator(10);
const AddPostForm: React.FC<InjectedFormProps<AddPostFormType>> = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field
      validate={[required, maxLength10]}
      component={Textarea}
      className='textArea'
      name='newPostBody'
      placeholder='Enter your post'
    />
    <div className={s.boxBtn}>
      <button className='btn'>Add post</button>
    </div>
  </form>
);

const AddPostFormRedux = reduxForm<AddPostFormType>({ form: 'postAddForm' })(AddPostForm);
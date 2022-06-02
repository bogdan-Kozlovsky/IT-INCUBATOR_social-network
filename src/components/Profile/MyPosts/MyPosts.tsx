import React, { memo } from 'react';

import { useDispatch } from 'react-redux';
import { Field, InjectedFormProps, reduxForm, reset } from 'redux-form';

import { addPostAC } from '../../../redux/actionCreator/profile/actionCreator';
import { selectPost } from '../../../redux/selectors/profile';

import s from './MyPosts.module.css';

import { Textarea } from 'common/FromControls/FormControls';
import { Post } from 'components/Profile/MyPosts/Post/Post';
import { useAppSelector } from 'types/useAppSelector';
import { maxLengthValue, required } from 'utils/validators';

type AddPostFormType = {
  newPostBody: string
}

export const MyPosts = memo(() => {
  const dispatch = useDispatch();
  const posts = useAppSelector(selectPost);

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

const maxLength10 = maxLengthValue(10);
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
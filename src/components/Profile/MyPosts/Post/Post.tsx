import React, { FC } from 'react';

import { useDispatch } from 'react-redux';

import { counterAC } from '../../../../redux/actionCreator/profile/actionCreator';

import s from './Post.module.css';

import likesActive from 'assets/images/likeActive.svg';
import likes from 'assets/images/likeNoActive.svg';
import postIcons from 'assets/images/post.svg';

// type
type PostPropsType = {
  message: string | undefined
  likesCount: number
  id: string
}

export const Post: FC<PostPropsType> = (props) => {
  const dispatch = useDispatch();
  const {
    message,
    likesCount,
    id,
  } = props;

  const counter = () => {
    dispatch(counterAC(id, likesCount + 1));
  };
  return (
    <div>
      <div className={s.item}>
        <div>
          <img className={s.icons} src={postIcons} alt='logo' />
          <span>{message}</span>
        </div>

        <div>
          {likesCount > 0
            ? <img onClick={counter} className={s.likesIcon} src={likesActive}
                   alt='likes' />
            : <img onClick={counter} className={s.likesIcon} src={likes}
                   alt='likesActive' />
          }
          <span>{likesCount}</span>
        </div>
      </div>
    </div>
  );
};
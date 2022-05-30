import React from 'react';

import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import s from '../Users.module.css';

import { UserPropsType } from './types';

import usersIcons from 'assets/images/users.png';
import { PATH } from 'enums/patch';
import { followTC, unfollowTC } from 'redux/reducer/users-reducer';

export const User = ({ ...props }: UserPropsType) => {

  const { user, followingInProgress } = props;

  const dispatch = useDispatch();

  const onUnfollowUserClick = (id: number) => {
    dispatch(unfollowTC(id));
  };

  const onFollowUserClick = (id: number) => {
    dispatch(followTC(id));
  };

  return (
    <div className={s.wrapper}>
      <div>
        <div>

          <NavLink to={`${PATH.PROFILE}/${user.id}`}>
            <img
              src={user.photos.small != null ? user.photos.small : usersIcons}
              className={s.userPhoto}
              alt='usePhoto'
            />
          </NavLink>

        </div>
      </div>

      <div>
        <div>
          <div className={s.name}>Name: <span className={s.nameSpan}>{user.name}</span></div>
          <span className={s.status}>{user.status ? user.status : 'no status'}</span>

          {user.followed
            ? <button className={s.btn}
                      disabled={followingInProgress.some(id => id === user.id)}
                      onClick={() => onUnfollowUserClick(user.id)}>
              Unfollow
            </button>
            : <button className={s.btn} disabled={followingInProgress.some(id => id === user.id)}
                      onClick={() => onFollowUserClick(user.id)}>
              Follow
            </button>
          }
        </div>
      </div>
    </div>);
};


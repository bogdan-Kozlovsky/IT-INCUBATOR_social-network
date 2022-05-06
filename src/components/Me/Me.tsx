import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../common/hook/selectorHook';
import { PATH } from '../../enums/patch';
import { getStatusTC, getUserProfileTC } from '../../redux/reducer/profile-reducer';
import { selectIsAuth, selectProfile } from '../../redux/reducer/selectors';
import { MyPosts } from '../Profile/MyPosts/MyPosts';
import { ProfileInfo } from '../Profile/ProfileInfo/ProfileInfo';

export const Me = () => {
  const dispatch = useDispatch();

  const { id, isAuth } = useAppSelector(selectIsAuth);
  const { profile, status } = useAppSelector(selectProfile);

  useEffect(() => {
    if (id) {
      dispatch(getUserProfileTC(Number(id)));
      dispatch(getStatusTC(Number(id)));
    }
  }, []);

  if (!isAuth) return <Navigate to={PATH.LOGIN} />;
  return (
    <div style={{ width: '100%' }}>
      <ProfileInfo
        profile={profile}
        status={status}
        userId={id}
      />
      <MyPosts />
    </div>
  );
};


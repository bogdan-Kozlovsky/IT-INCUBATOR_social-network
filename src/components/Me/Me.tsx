import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'common/hook/selectorHook';
import { MyPosts } from 'components/Profile/MyPosts/MyPosts';
import { ProfileInfo } from 'components/Profile/ProfileInfo/ProfileInfo';
import { PATH } from 'enums/patch';
import { getStatusTC, getUserProfileTC } from 'redux/reducer/profile-reducer';
import { selectIsAuth, selectProfile } from 'redux/reducer/selectors';

export const Me = () => {
  const dispatch = useDispatch();

  const { id, isAuth } = useAppSelector(selectIsAuth);
  const { profile, status } = useAppSelector(selectProfile);
  const photo = useAppSelector(selectProfile).profile?.photos.small;
  // const foto = profile?.photos.large;

  useEffect(() => {
    if (id) {
      dispatch(getUserProfileTC(Number(id)));
      dispatch(getStatusTC(Number(id)));
    }
  }, []);

  // useEffect(() => {
  //   dispatch(getUserProfileTC(Number(id)));
  // }, [photo]);

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


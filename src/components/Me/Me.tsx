import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIdAuth, selectIsAuth } from '../../redux/selectors/auth';
import { selectProfile, selectStatus } from '../../redux/selectors/profile';

import { MyPosts } from 'components/Profile/MyPosts/MyPosts';
import { ProfileInfo } from 'components/Profile/ProfileInfo/ProfileInfo';
import { PATH } from 'enums/patch';
import { getStatusTC, getUserProfileTC } from 'redux/reducer/profile-reducer';
import { useAppSelector } from 'types/useAppSelector';

export const Me = () => {
  const dispatch = useDispatch();

  const isAuth = useAppSelector(selectIsAuth);
  const idAuth = useAppSelector(selectIdAuth);
  const status = useAppSelector(selectStatus);
  const profile = useAppSelector(selectProfile);
  
  // const photo = useAppSelector(selectProfile).profile?.photos.small;
  // const foto = profile?.photos.large;

  useEffect(() => {
    if (idAuth) {
      dispatch(getUserProfileTC(Number(idAuth)));
      dispatch(getStatusTC(Number(idAuth)));
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
        userId={idAuth}
      />
      <MyPosts />
    </div>
  );
};


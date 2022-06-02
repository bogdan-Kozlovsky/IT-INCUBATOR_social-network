import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getStatusTC } from '../../redux/middlewares/profile/getStatusTC';
import { getUserProfileTC } from '../../redux/middlewares/profile/getUserProfileTC';
import { selectIdAuth, selectIsAuth } from '../../redux/selectors/auth';
import { selectProfile, selectStatus } from '../../redux/selectors/profile';

import s from 'components/Me/Me.module.css';
import { MyPosts } from 'components/Profile/MyPosts/MyPosts';
import { ProfileInfo } from 'components/Profile/ProfileInfo/ProfileInfo';
import { PATH } from 'enums/patch';
import { useAppSelector } from 'types/useAppSelector';

export const Me = () => {

  const dispatch = useDispatch();

  const isAuth = useAppSelector(selectIsAuth);
  const idAuth = useAppSelector(selectIdAuth);
  const status = useAppSelector(selectStatus);
  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    if (idAuth) {
      dispatch(getUserProfileTC(Number(idAuth)));
      dispatch(getStatusTC(Number(idAuth)));
    }
  }, []);

  if (!isAuth) return <Navigate to={PATH.LOGIN} />;

  return (
    <div className={s.wrapper}>
      <ProfileInfo
        profile={profile}
        status={status}
        userId={idAuth}
      />

      <MyPosts />

    </div>
  );
};


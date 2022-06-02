import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { getStatusTC } from '../../redux/middlewares/profile/getStatusTC';
import { getUserProfileTC } from '../../redux/middlewares/profile/getUserProfileTC';
import { selectIsAuth } from '../../redux/selectors/auth';
import { selectProfile, selectStatus } from '../../redux/selectors/profile';

import s from 'components/Profile/Profile.module.css';
import { ProfileInfo } from 'components/Profile/ProfileInfo/ProfileInfo';
import { PATH } from 'enums/patch';
import { useAppSelector } from 'types/useAppSelector';

export const Profile = () => {

  const dispatch = useDispatch();

  const profile = useAppSelector(selectProfile);
  const status = useAppSelector(selectStatus);
  const isAuth = useAppSelector(selectIsAuth);

  const { userId } = useParams<{ userId: string | undefined }>();

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfileTC(Number(userId)));
      dispatch(getStatusTC(Number(userId)));
    }
  }, [userId, dispatch]);

  if (!isAuth) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={s.wrapper}>
      <ProfileInfo
        profile={profile}
        status={status}
        userId={userId}
      />
    </div>
  );
};


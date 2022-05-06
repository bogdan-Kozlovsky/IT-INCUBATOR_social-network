import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { useAppSelector } from '../../common/hook/selectorHook';
import { PATH } from '../../enums/patch';
import { getStatusTC, getUserProfileTC } from '../../redux/reducer/profile-reducer';
import { selectIsAuth, selectProfile } from '../../redux/reducer/selectors';

import { ProfileInfo } from './ProfileInfo/ProfileInfo';

export const Profile = () => {
  const dispatch = useDispatch();
  const { profile, status } = useAppSelector(selectProfile);
  const { isAuth } = useAppSelector(selectIsAuth);
  const { userId } = useParams<{ userId: string | undefined }>();

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfileTC(Number(userId)));
      dispatch(getStatusTC(Number(userId)));
    }
  }, [userId, dispatch]);

  if (!isAuth) return <Navigate to={PATH.LOGIN} />;
  return (
    <div style={{ width: '100%' }}>
      <ProfileInfo
        profile={profile}
        status={status}
        userId={userId}
      />
    </div>
  );
};


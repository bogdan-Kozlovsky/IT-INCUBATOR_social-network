import React from 'react';

import { useDispatch } from 'react-redux';

import logoutIcon from '../../../assets/images/logout.svg';
import usersIcons from '../../../assets/images/users.png';
import { logoutTC } from '../../../redux/middlewares/auth/logoutTC';
import { selectProfile } from '../../../redux/selectors/profile';
import { useAppSelector } from '../../../types/useAppSelector';
import s from '../Header.module.css';

export const LogoutNavigate = () => {

  const dispatch = useDispatch();

  const profileData = useAppSelector(selectProfile);

  const onLogoutClick = () => {
    dispatch(logoutTC());
  };

  return (
    <div className={s.headerNavigateBox}>
      <img className={s.avatar} src={profileData?.photos.small || usersIcons}
           alt='avatar' />
      <button type='submit' className={s.btn} onClick={onLogoutClick}>
        <span className={s.text}>Log out</span>
        <img className={s.logout} src={logoutIcon} alt='logoutIcon' />
      </button>
    </div>
  );
};


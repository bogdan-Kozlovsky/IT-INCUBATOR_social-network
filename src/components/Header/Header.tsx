import React from 'react';

import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { selectIsAuth } from '../../redux/selectors/auth';
import { selectProfile } from '../../redux/selectors/profile';

import s from './Header.module.css';

import logoutIcon from 'assets/images/logout.svg';
import usersIcons from 'assets/images/users.png';
import { PATH } from 'enums/patch';
import { logoutTC } from 'redux/reducer/auth-reducer';
import { useAppSelector } from 'types/useAppSelector';

export const Header = () => {
  const dispatch = useDispatch();

  const isAuth = useAppSelector(selectIsAuth);
  const profile = useAppSelector(selectProfile);

  const logoutHandler = () => {
    dispatch(logoutTC());
  };

  return (
    <header className={s.header}>
      <div className='maxContainer'>
        <div className={s.wrapper}>
          <div>
            <span className={s.headerLogoText}>It-incubator</span>
          </div>
          <div className={s.loginBlock}>

            {isAuth
              ? <div className={s.headerNavigateBox}>
                <img className={s.avatar} src={profile?.photos.small || usersIcons}
                     alt='avatar' />
                <button type='submit' className={s.btn} onClick={logoutHandler}>
                  <span className={s.text}>Log out</span>
                  <img className={s.logout} src={logoutIcon} alt='logoutIcon' />
                </button>
              </div>
              : <NavLink className={s.login} to={PATH.LOGIN}>Login</NavLink>}
          </div>
        </div>
      </div>
    </header>
  );
};

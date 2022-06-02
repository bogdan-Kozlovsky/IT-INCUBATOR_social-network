import React from 'react';

import { NavLink } from 'react-router-dom';

import { selectIsAuth } from '../../redux/selectors/auth';

import s from './Header.module.css';
import { LogoutNavigate } from './LogoutNavigate/LogoutNavigate';

import { PATH } from 'enums/patch';
import { useAppSelector } from 'types/useAppSelector';

export const Header = () => {

  const isAuth = useAppSelector(selectIsAuth);

  return (
    <header className={s.header}>
      <div className='maxContainer'>
        <div className={s.wrapper}>
          <div>
            <span className={s.headerLogoText}>It-incubator</span>
          </div>
          <div className={s.loginBlock}>

            {isAuth

              ? <LogoutNavigate />

              : <NavLink className={s.login} to={PATH.LOGIN}>Login</NavLink>}
          </div>
        </div>
      </div>
    </header>
  );
};

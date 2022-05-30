import React from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import s from './navigation.module.scss';

import { PATH } from 'enums/patch';

export const Navigation = () => {

  const isActiveClass = (isActive: boolean) => `${s.navigation__link} ${isActive ? s.navigation__active : ''}`;

  return (
    <div>
      <ul className={cn(s.navigation__items, s.navigation)}>
        <li className={s.navigation__item}>

          <NavLink
            className={({ isActive }) => isActiveClass(isActive)}
            to={PATH.ME}>
            Me
          </NavLink>

        </li>
        <li className={s.navigation__item}>
          <NavLink
            className={({ isActive }) => isActiveClass(isActive)}
            to={PATH.DIALOGS}>
            Messages
          </NavLink>

        </li>
        <li className={s.navigation__item}>

          <NavLink
            className={({ isActive }) => isActiveClass(isActive)}
            to={PATH.USERS}>
            Users
          </NavLink>

        </li>
      </ul>
    </div>
  );
};
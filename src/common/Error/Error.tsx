import React from 'react';

import { selectError } from '../../redux/reducer/selectors';
import { useAppSelector } from '../hook/selectorHook';

import style from './error.module.css';

export const Error = () => {
  const error = useAppSelector(selectError);
  return (
    <div className={style.wrapper}>
      <div className={style.block}>
        {error}
      </div>
    </div>
  );
};


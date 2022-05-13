import React from 'react';

import style from './error.module.css';

import { useAppSelector } from 'common/hook/selectorHook';
import { selectError } from 'redux/reducer/selectors';

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


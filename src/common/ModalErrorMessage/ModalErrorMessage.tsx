import React from 'react';

import { selectErrorMessage } from '../../redux/selectors/errorMessage';

import style from './error.module.css';

import { useAppSelector } from 'types/useAppSelector';

export const ModalErrorMessage = () => {

  const errorMessage = useAppSelector(selectErrorMessage);

  return (
    <div className={style.wrapper}>
      <div className={style.block}>
        {errorMessage}
      </div>
    </div>
  );
};


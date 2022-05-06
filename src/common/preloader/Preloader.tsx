import React from 'react';

import loading from '../../assets/images/loader.gif';

import s from './style.module.css';

export const Preloader = () => (
    <div className={s.box}>
      <img className={s.img} src={loading} alt='loading' />
    </div>
  );

import React from 'react';

import s from './style.module.css';

import loading from 'assets/images/loader.gif';

export const Preloader = () => (
  <div className={s.box}>

    <img className={s.img} src={loading} alt='loading' />

  </div>
);

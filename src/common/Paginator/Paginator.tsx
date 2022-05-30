import React, { useState } from 'react';

import s from './paginator.module.css';
import { PaginatorPropsType } from './types';

import leftArrow from 'assets/images/leftArrow.svg';
import rightArrow from 'assets/images/rightArrow.svg';

const MAX_PAGE_NUMBER = 10;

export const Paginator = (props: PaginatorPropsType) => {
  const {
    pageSize,
    totalUsersCount,
    currentPage,
    onPageChanged,
    portionSize = MAX_PAGE_NUMBER,
  } = props;

  const [portionNumber, setPortionNumber] = useState(1);

  const onIncrementPortionClick = () => {
    setPortionNumber(portionNumber + 1);
  };
  const onDecrementPortionClick = () => {
    setPortionNumber(portionNumber - 1);
  };

  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const portionCount = Math.ceil(pagesCount / portionSize);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return <div className={s.wrapperPaginator}>

    {portionNumber > 1 &&
      <button className={s.btn} onClick={onDecrementPortionClick}>
        <img className={s.arrow} src={leftArrow} alt='leftArrow' />
      </button>
    }

    {pages
      .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
      .map((p) => <span
        className={`${s.span} ${currentPage === p ? s.active : ''}`}
        key={p}
        onClick={() => onPageChanged(p)}>{p}</span>)
    }

    {portionCount > portionNumber &&
      <button className={s.btn} onClick={onIncrementPortionClick}>
        <img className={s.arrow} src={rightArrow} alt='rightArrow' />
      </button>}
  </div>;
};

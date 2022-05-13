import React, { useState } from 'react';

import s from './paginator.module.css';

import leftArrow from 'assets/images/leftArrow.svg';
import rightArrow from 'assets/images/rightArrow.svg';

type propsType = {
  pageSize: number
  currentPage: number
  totalUsersCount: number
  onPageChanged: (pageNumber: number) => void
  // eslint-disable-next-line react/require-default-props
  portionSize?: number
}
const Paginator = ({ ...props }: propsType) => {
  const {
    pageSize,
    totalUsersCount,
    currentPage,
    onPageChanged,
    portionSize = 10,
  } = props;

  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return <div className={s.wrapperPaginator}>
    {portionNumber > 1 &&
      <button className={s.btn} onClick={() => {
        setPortionNumber(portionNumber - 1);
      }}>
        <img className={s.arrow} src={leftArrow} alt='leftArrow' />
      </button>}

    {pages
      .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
      .map((p) => <span
        className={`${s.span} ${currentPage === p ? s.active : ''}`}
        key={p}
        onClick={(e) => {
          onPageChanged(p);
        }}>{p}</span>)}
    {portionCount > portionNumber &&
      <button className={s.btn} onClick={() => {
        setPortionNumber(portionNumber + 1);
      }}>
        <img className={s.arrow} src={rightArrow} alt='rightArrow' />
      </button>}

  </div>;
};

export default Paginator;
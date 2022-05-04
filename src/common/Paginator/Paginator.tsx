import React, {useState} from 'react';
// import s from '../../components/Users/users.module.css'
import rightArrow from '../../assets/images/rightArrow.svg'
import leftArrow from '../../assets/images/leftArrow.svg'

import s from './paginator.module.css'

type propsType = {
    pageSize: number
    currentPage: number
    totalUsersCount: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}
let Paginator = ({...props}: propsType) => {
    const {
        pageSize,
        totalUsersCount,
        currentPage,
        onPageChanged,
        portionSize = 10,
    } = props


    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    return <div className={s.wrapperPaginator}>
        {portionNumber > 1 &&
            <button className={s.btn} onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>
                <img className={s.arrow} src={leftArrow} alt="leftArrow"/>
            </button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span
                    className={`${s.span} ${currentPage === p ? s.active : ''}`}
                    key={p}
                    onClick={(e) => {
                        onPageChanged(p);
                    }}>{p}</span>
            })}
        {portionCount > portionNumber &&
            <button className={s.btn} onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>
                <img className={s.arrow} src={rightArrow} alt="rightArrow"/>
            </button>}


    </div>
}

export default Paginator;
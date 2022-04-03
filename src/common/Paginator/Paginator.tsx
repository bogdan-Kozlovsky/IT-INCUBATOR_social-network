import React from 'react';
import s from '../../components/Users/users.module.css'
type propsType = {
    pageSize: number
    currentPage: number
    totalUsersCount: number
    onPageChanged: (pageNumber: number) => void
}
let Paginator = ({...props}:propsType) => {

    const {
        pageSize,
        totalUsersCount,
        currentPage,
        onPageChanged,
    } = props

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        {/*{pages.map(p => {*/}
        {/*    return <span className={currentPage === p && styles.selectedPage}*/}
        {/*                 onClick={(e) => {*/}
        {/*                     onPageChanged(p);*/}
        {/*                 }}>{p}</span>*/}
        {/*})}*/}
        {pages.map((el, index) => {
                    return <span
                        key={index}
                        style={{cursor: 'pointer'}}
                        onClick={() => onPageChanged(el)}
                        className={currentPage === el ? s.active : ''}>{el}</span>
                })
                }
    </div>
}

export default Paginator;
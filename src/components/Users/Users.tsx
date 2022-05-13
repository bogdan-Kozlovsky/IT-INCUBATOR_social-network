import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import s from './users.module.css';

import { useAppSelector } from 'common/hook/selectorHook';
import Paginator from 'common/Paginator/Paginator';
import { User } from 'components/Users/User';
import { PATH } from 'enums/patch';
import { selectIsAuth, selectUsers } from 'redux/reducer/selectors';
import { getUsersTC } from 'redux/reducer/users-reducer';

export const Users = () => {
  const dispatch = useDispatch();

  const {
    users,
    pageSize,
    totalUsersCount,
    currentPage,
    followingInProgress,
    // isFetching,
  } = useAppSelector(selectUsers);
  const { isAuth } = useAppSelector(selectIsAuth);
  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsersTC(pageNumber, pageSize));
  };

  useEffect(() => {
    dispatch(getUsersTC(currentPage, pageSize));
  }, []);

  if (!isAuth) {
    return <Navigate to={PATH.LOGIN} />;
  }
  return <div className={s.wrapperUsers}>
    {/* {isFetching && <img className={s.loader} src={loading} alt="loading"/>} */}

    <Paginator
      currentPage={currentPage}
      onPageChanged={onPageChanged}
      totalUsersCount={totalUsersCount}
      pageSize={pageSize}
    />

    <div className={s.boxUser}>
      {
        users.map(u => (
            <User key={u.id}
                  user={u}
                  followingInProgress={followingInProgress}
            />
          ),
        )
      }
    </div>
  </div>;
};


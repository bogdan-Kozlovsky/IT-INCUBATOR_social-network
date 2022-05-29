import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIsAuth } from '../../redux/selectors/auth';
import {
  selectCurrentPage,
  selectFollowingInProgress,
  selectPageSize,
  selectTotalUsersCount,
  selectUsers,
} from '../../redux/selectors/users';

import s from './users.module.css';

import Paginator from 'common/Paginator/Paginator';
import { User } from 'components/Users/User';
import { PATH } from 'enums/patch';
import { getUsersTC } from 'redux/reducer/users-reducer';
import { useAppSelector } from 'types/useAppSelector';

export const Users = () => {
  const dispatch = useDispatch();

  const currentPage = useAppSelector(selectCurrentPage);
  const pageSize = useAppSelector(selectPageSize);
  const totalUsersCount = useAppSelector(selectTotalUsersCount);
  const followingInProgress = useAppSelector(selectFollowingInProgress);
  const users = useAppSelector(selectUsers);

  const isAuth = useAppSelector(selectIsAuth);
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


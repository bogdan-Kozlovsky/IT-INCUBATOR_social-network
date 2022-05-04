import React, {useEffect} from 'react';
import {getUsersTC} from "../../redux/users-reducer";
import Paginator from "../../common/Paginator/Paginator";
import {User} from "./User";
import {useAppSelector} from "../../common/hook/selectorHook";
import {selectIsAuth, selectUsers} from "../../redux/selectors";
import {useDispatch} from "react-redux";
import {Preloader} from "../../common/preloader/Preloader";
import s from './users.module.css'
import {Navigate} from "react-router-dom";
import {PATH} from "../../enums/patch";

export const Users = () => {
    const dispatch = useDispatch()
    const {isAuth} = useAppSelector(selectIsAuth)
    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersTC(pageNumber, pageSize))
    }

    const {users, pageSize, totalUsersCount, currentPage, followingInProgress, isFetching} = useAppSelector(selectUsers)

    useEffect(() => {
        dispatch(getUsersTC(currentPage, pageSize))
    }, [])

    if (!isAuth) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return <div className={s.wrapperUsers}>
        {isFetching && <Preloader/>}

        <Paginator
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
        />
        <div className={s.boxUser}>
            {
                users.map(u => {
                        return (
                            <User key={u.id}
                                  user={u}
                                  followingInProgress={followingInProgress}
                            />
                        )
                    }
                )
            }
        </div>
    </div>
}


import React, {useEffect} from 'react';
import {getUsersTC} from "../../redux/users-reducer";
import Paginator from "../../common/Paginator/Paginator";
import {User} from "./User";
import {useAppSelector} from "../../common/hook/selectorHook";
import {selectUsers} from "../../redux/selectors";
import {useDispatch} from "react-redux";
import {Preloader} from "../../common/preloader/Preloader";


export const Users = () => {
    const dispatch = useDispatch()

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersTC(pageNumber, pageSize))
    }

    const {users, pageSize, totalUsersCount, currentPage, followingInProgress, isFetching} = useAppSelector(selectUsers)

    useEffect(() => {
        dispatch(getUsersTC(currentPage, pageSize))
    }, [])

    return <div>
        {isFetching && <Preloader/>}
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalUsersCount={totalUsersCount} pageSize={pageSize}/>
        <div>
            {
                users.map(u => <User user={u}
                                     followingInProgress={followingInProgress}
                                     key={u.id}
                    />
                )
            }
        </div>
    </div>
}


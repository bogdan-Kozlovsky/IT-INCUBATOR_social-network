import React from 'react';
import { UserType} from "../../redux/users-reducer";
import Paginator from "../../common/Paginator/Paginator";
import {User} from "./User";

type propsType = {
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followTC: (id: number) => void
    unfollowTC: (id: number) => void
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: number[]
}

export const Users = ({...props}: propsType) => {
    const {
        pageSize,
        totalUsersCount,
        users,
        currentPage,
        followTC,unfollowTC,
        onPageChanged,
    } = props
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalUsersCount={totalUsersCount} pageSize={pageSize} />
        <div>
            {
                users.map(u => <User user={u}
                                     followingInProgress={props.followingInProgress}
                                     key={u.id}
                                     unfollowTC={unfollowTC}
                                     followTC={followTC}
                    />
                )
            }
        </div>
    </div>
}


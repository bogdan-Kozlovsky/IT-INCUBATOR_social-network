import React from 'react';
import s from "./users.module.css";
import usersIcons from "../../assets/images/users.png";
import {UserType} from "../../redux/users-reducer";

type propsType = {
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (id: number) => void
    unfollow: (id: number) => void
}

export const Users = ({...props}: propsType) => {
    const {
        pageSize,
        totalUsersCount,
        users,
        currentPage,
        unfollow,
        follow,
        onPageChanged,
    } = props

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>

            <div>
                {pages.map(el => {
                    return <span
                        style={{cursor: 'pointer'}}
                        onClick={() => onPageChanged(el)}
                        className={currentPage === el ? s.active : ''}>{el}</span>
                })
                }
            </div>


            {users.map(u => <div key={u.id}>
                    <span>
                    <div>
                    <img style={{width: '70px', objectFit: 'cover'}}
                         src={u.photos.small !== null ? u.photos.small : usersIcons}/>
                    </div>
                    <div>
                {
                    u.followed
                        ? <button onClick={() => unfollow(u.id)}>Unfollow</button>
                        : <button onClick={() => follow(u.id)}>Follow</button>
                }

                    </div>
                    </span>
                <span>
                    <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                    </span>
                    <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                    </span>
                    </span>
            </div>)}

        </div>
    );
};


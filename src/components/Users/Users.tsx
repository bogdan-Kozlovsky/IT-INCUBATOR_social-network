import React from 'react';
import s from "./users.module.css";
import usersIcons from "../../assets/images/users.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type propsType = {
    onPageChanged: (pageNumber: number) => void
    users: UserType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (id: number) => void
    unfollow: (id: number) => void
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: number[]
}

export const Users = ({...props}: propsType) => {
    console.log(props)
    const {
        pageSize,
        totalUsersCount,
        users,
        currentPage,
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
                {pages.map((el, index) => {
                    return <span
                        key={index}
                        style={{cursor: 'pointer'}}
                        onClick={() => onPageChanged(el)}
                        className={currentPage === el ? s.active : ''}>{el}</span>
                })
                }
            </div>


            {users.map(u => <div key={u.id}>
                    <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                             <img style={{width: '70px', objectFit: 'cover'}}
                                  src={u.photos.small !== null ? u.photos.small : usersIcons}/>
                        </NavLink>

                    </div>
                    <div>
                {
                    u.followed
                        ? <button
                            disabled={props.followingInProgress.some(id => id === u.id)}
                            onClick={() => {
                                props.toggleIsFollowingProgress(true, u.id);
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY': "edbb6621-0047-4274-8a4c-f1d2a1bf4727    "
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                        props.toggleIsFollowingProgress(false, u.id);
                                    })
                            }}>Unfollow</button>

                        : <button
                            disabled={props.followingInProgress.some(id => id === u.id)}
                            onClick={() => {
                                props.toggleIsFollowingProgress(true, u.id);
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY': "edbb6621-0047-4274-8a4c-f1d2a1bf4727"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                        props.toggleIsFollowingProgress(false, u.id);
                                    })
                            }
                            }>Follow</button>
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


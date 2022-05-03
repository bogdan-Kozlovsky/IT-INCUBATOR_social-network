import React from 'react';
import styles from "./users.module.css";
import usersIcons from "../../assets/images/users.png";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {followTC, unfollowTC, UserType} from "../../redux/users-reducer";


type propsType = {
    // user: UserType[]
    user: any
    followingInProgress: number[]
}

export let User = ({...props}: propsType) => {
    const dispatch = useDispatch()
    const {
        user,
        followingInProgress,
    } = props

    const onHandlerUnfollow = (id: number) => {
        dispatch(unfollowTC(id))
    }

    const onHandlerFollow = (id: number) => {
        dispatch(followTC(id))
    }

    return (
        <div>
                <span>
                    <div>
                       <NavLink to={'/profile/' + user.id}>
                        <img style={{width: '70px', objectFit: 'cover'}}
                             src={user.photos.small != null ? user.photos.small : usersIcons}
                             className={styles.userPhoto}
                             alt={'usePhoto'}
                        />
                       </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button
                                disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => onHandlerUnfollow(user.id)}>
                                Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => onHandlerFollow(user.id)}>
                                Follow</button>}
                    </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"}</div>
                    </span>
                </span>
        </div>)
}


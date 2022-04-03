import React from 'react';
import styles from "./users.module.css";
import usersIcons from "../../assets/images/users.png";
import {NavLink} from "react-router-dom";


type propsType = {
    user: any
    followTC: (id: number) => void
    unfollowTC: (id: number) => void
    followingInProgress: number[]
}

export let User = ({...props}: propsType) => {

    const {
        user,
        followingInProgress,
        unfollowTC,
        followTC,
    } = props

    return (
        <div>
                <span>
                    <div>
                       <NavLink to={'/profile/' + user.id}>
                        <img style={{width: '70px', objectFit: 'cover'}}
                             src={user.photos.small != null ? user.photos.small : usersIcons}
                             className={styles.userPhoto}/>
                       </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button
                                disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => unfollowTC(user.id)}>
                                Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => followTC(user.id)}>
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


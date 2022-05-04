import React from 'react';
import s from "./users.module.css";
import usersIcons from "../../assets/images/users.png";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {followTC, unfollowTC, UserType} from "../../redux/users-reducer";
import {PATH} from "../../enums/patch";

type propsType = {
    user: UserType
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
        <div className={s.wrapper}>
            <div>
                <div>
                    {/*<NavLink to={'/profile/' + user.id}>*/}
                    {/* <NavLink to={`${PATH.PROFILE}/${user.id}`}>*/}
                    <NavLink to={'/profile/' + user.id}>
                        <img
                            src={user.photos.small != null ? user.photos.small : usersIcons}
                            className={s.userPhoto}
                            alt={'usePhoto'}
                        />
                    </NavLink>
                </div>

            </div>
            <div>
                <div>
                    <div className={s.name}>Name: <span className={s.nameSpan}>{user.name}</span></div>
                    <span className={s.status}>{user.status ? user.status : 'no status'}</span>
                    {user.followed
                        ? <button className={s.btn}
                                  disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => onHandlerUnfollow(user.id)}>
                            Unfollow
                        </button>
                        : <button className={s.btn} disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => onHandlerFollow(user.id)}>
                            Follow
                        </button>
                    }
                </div>
            </div>
        </div>)
}


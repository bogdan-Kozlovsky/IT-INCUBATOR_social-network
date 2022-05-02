import React, {useEffect} from 'react';
import {MyPosts} from "../Profile/MyPosts/MyPosts";
import {useAppSelector} from "../../common/hook/selectorHook";
import {selectIsAuth, selectProfile} from "../../redux/selectors";
import {getStatusTC, getUserProfileTC} from "../../redux/profile-reducer";
import {Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ProfileInfo} from "../Profile/ProfileInfo/ProfileInfo";

export const Me = () => {
    const dispatch = useDispatch()

    const {id, isAuth} = useAppSelector(selectIsAuth)
    const {profile, status} = useAppSelector(selectProfile)

    useEffect(() => {
        if (id) {
            dispatch(getUserProfileTC(Number(id)))
            dispatch(getStatusTC(Number(id)))
        }
    }, [])


    if (!isAuth) return <Navigate to={'/login'}/>
    return (
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                userId={id}
            />
            <MyPosts/>
        </div>
    );
};


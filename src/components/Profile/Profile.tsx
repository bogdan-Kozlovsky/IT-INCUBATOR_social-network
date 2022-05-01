import React, {useEffect} from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {Navigate, useParams} from "react-router-dom";
import {MyPosts} from "./MyPosts/MyPosts";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../common/hook/selectorHook";
import {selectIsAuth, selectProfile} from "../../redux/selectors";
import {getStatusTC, getUserProfileTC} from "../../redux/profile-reducer";

export const Profile = () => {

    const dispatch = useDispatch()
    const {profile, status} = useAppSelector(selectProfile)
    const {isAuth} = useAppSelector(selectIsAuth)
    // const userId = useParams()
    // console.log(userId)
    const userId = '22141'


    useEffect(() => {
        if (userId) {
            dispatch(getUserProfileTC((userId)))
            dispatch(getStatusTC((userId)))
        }
    }, [userId, dispatch])
    // }, [])


    if (!isAuth) return <Navigate to={'/login'}/>
    return (
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                isOwner={!userId}
            />
            <MyPosts/>
        </div>
    );
};


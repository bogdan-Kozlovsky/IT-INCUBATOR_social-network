import React, {useEffect} from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../common/hook/selectorHook";
import {selectIsAuth, selectProfile} from "../../redux/selectors";
import {getStatusTC, getUserProfileTC} from "../../redux/profile-reducer";
import {PATH} from "../../enums/patch";


export const Profile = () => {
    const dispatch = useDispatch()
    const {profile, status} = useAppSelector(selectProfile)
    const {isAuth} = useAppSelector(selectIsAuth)
    const {userId} = useParams<{ userId: string | undefined }>()


    useEffect(() => {
        if (userId) {
            dispatch(getUserProfileTC(Number(userId)))
            dispatch(getStatusTC(Number(userId)))
        }
    }, [userId, dispatch])


    if (!isAuth) return <Navigate to={PATH.LOGIN}/>
    return (
        <div style={{width: '100%'}}>
            <ProfileInfo
                profile={profile}
                status={status}
                userId={userId}
            />
        </div>
    );
};


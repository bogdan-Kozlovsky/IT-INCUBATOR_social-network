import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePropsType} from "./ProfileContainer";
import {Navigate} from "react-router-dom";
import {MyPosts} from "./MyPosts/MyPosts";

// type
type PropsType = {
    profile: ProfilePropsType | null
    isAuth: Boolean
    status: string,
    isOwner: boolean
}
export const Profile = (props: PropsType) => {

    const {
        isAuth,
        profile,
        status,
        isOwner,
    } = props

    if (!isAuth) return <Navigate to={'/login'}/>
    return (
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                isOwner={isOwner}
            />
            <MyPosts/>
        </div>
    );
};


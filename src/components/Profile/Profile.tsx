import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostContainers";
import {ProfilePropsType} from "./ProfileContainer";
import {Navigate} from "react-router-dom";

// type
type PropsType = {
    profile: ProfilePropsType | null
    isAuth: Boolean
    status: string,
    updateStatusTC: (status: string) => void
}
export const Profile = (props: PropsType) => {

    const {
        isAuth,
        profile,
        status,
        updateStatusTC,
    } = props

    if (!isAuth) return <Navigate to={'/login'}/>
    return (
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                updateStatusTC={updateStatusTC}
            />
            <MyPostsContainer/>
        </div>
    );
};


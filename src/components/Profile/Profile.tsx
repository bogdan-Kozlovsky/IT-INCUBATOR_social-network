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
    updateStatusTC: (status: string) => void
    isOwner: boolean
    savePhotoTC: (profile: ProfilePropsType) => Promise<any>
}
export const Profile = (props: PropsType) => {

    const {
        isAuth,
        profile,
        status,
        updateStatusTC,
        isOwner,
        savePhotoTC,
    } = props

    if (!isAuth) return <Navigate to={'/login'}/>
    return (
        <div>
            <ProfileInfo
                saveProfileTC={savePhotoTC}
                profile={profile}
                status={status}
                updateStatusTC={updateStatusTC}
                isOwner={isOwner}
                savePhotoTC={savePhotoTC}
            />
            <MyPosts/>
        </div>
    );
};


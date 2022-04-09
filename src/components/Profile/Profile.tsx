import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostContainers";
import {ProfilePropsType} from "./ProfileContainer";
import {Navigate} from "react-router-dom";
import {savePhotoTC} from "../../redux/profile-reducer";

// type
type PropsType = {
    profile: ProfilePropsType | null
    isAuth: Boolean
    status: string,
    updateStatusTC: (status: string) => void
    isOwner: boolean
    savePhotoTC: (file: any) => void
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
                profile={profile}
                status={status}
                updateStatusTC={updateStatusTC}
                isOwner={isOwner}
                savePhotoTC={savePhotoTC}
            />
            <MyPostsContainer/>
        </div>
    );
};


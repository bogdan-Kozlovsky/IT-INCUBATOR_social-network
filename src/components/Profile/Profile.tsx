import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostContainers";
import {ProfilePropsType} from "./ProfileContainer";
import {Navigate} from "react-router-dom";

type propsType = {
    profile: ProfilePropsType | null
    isAuth: Boolean
}
export const Profile = ({...props}: propsType) => {
    const {
        profile
    } = props
    if (!props.isAuth) return <Navigate to={'/login'}/>
    return (
        <div>
            <ProfileInfo profile={profile}/>
            <MyPostsContainer/>
        </div>
    );
};


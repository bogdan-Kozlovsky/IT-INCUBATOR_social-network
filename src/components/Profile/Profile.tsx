import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostContainers";
import {ProfilePropsType} from "./ProfileContainer";
import {Navigate} from "react-router-dom";

type propsType = {
    profile: ProfilePropsType | null
    isAuth: Boolean
    status: string,
    updateStatusTC: (status: string) => void
}
export const Profile = ({...props}: propsType) => {

    // if (!props.isAuth) return <Navigate to={'/login'}/>
    return (
        <div>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatusTC={props.updateStatusTC}
            />
            <MyPostsContainer/>
        </div>
    );
};


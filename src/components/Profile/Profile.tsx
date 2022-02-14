import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostContainers";
import {ProfilePropsType} from "./ProfileContainer";

type propsType = {
    profile: ProfilePropsType | null
}
export const Profile = ({...props}: propsType) => {
    const {
        profile
    } = props
    return (
        <div>
            <ProfileInfo profile={profile}/>
            <MyPostsContainer/>
        </div>
    );
};


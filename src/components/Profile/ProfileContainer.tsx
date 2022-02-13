import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfileAC} from "../../redux/profile-reducer";
import {Profile} from "./Profile";
import {AppStateType} from "../../redux/redux-store";

export type ContactsPropsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosPropsType = { large: string, small: string }
export type ProfilePropsType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsPropsType
    photos: PhotosPropsType
}


export type MapStatePropsType = {
    profile: ProfilePropsType
}
export type MapDispatchToPropsType = {
    setUserProfileAC: (profile: any) => void
}
export type ProfileContainerPropsType = MapStatePropsType & MapDispatchToPropsType


class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfileAC(response.data);
            });
    }


    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile
});

export default connect(mapStateToProps, {setUserProfileAC})(ProfileContainer);

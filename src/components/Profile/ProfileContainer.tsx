import React, {ComponentType, FC} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {getUserProfileThunk, setUserProfileAC} from "../../redux/profile-reducer";
import {Profile} from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {NavigateFunction, Params, useLocation, useNavigate, useParams,} from "react-router-dom";
import {usersAPI} from "../../api/api";


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
    profile: ProfilePropsType | null
}
export type MapDispatchToPropsType = {
    getUserProfileThunk: (userId: string) => void
    // setUserProfileAC: (profile: ProfilePropsType) => void
}

type RoutersType = {
    router: {
        location: Location
        params: Params<string>
        navigate: NavigateFunction
    }
}
export type ProfileContainerPropsType = MapStatePropsType & MapDispatchToPropsType & RoutersType


class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId: any = this.props.router.params.userId
        if (!userId) {
            userId = '2'
        }
        this.props.getUserProfileThunk(userId)
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


const WithURLDataContainerProfileComponent: ComponentType<ProfileContainerPropsType & any> = withRouter(ProfileContainer)

export default connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {getUserProfileThunk: getUserProfileThunk})(WithURLDataContainerProfileComponent);

export function withRouter<T>(Component: ComponentType<T>): ComponentType<T & WithRouterType> {

    const ComponentWithRouterProp = (props: T & WithRouterType) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }
    return ComponentWithRouterProp;
}

type WithRouterType = Location & NavigateFunction & Readonly<Params<string>>;


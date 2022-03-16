import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {getStatusTC, getUserProfileTC, updateStatusTC} from "../../redux/profile-reducer";
import {Profile} from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {NavigateFunction, Params, useLocation, useNavigate, useParams,} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/WithAuthNavigate";


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
    isAuth: Boolean
    status: string
}
export type MapDispatchToPropsType = {
    getUserProfileTC: (userId: string) => void
    getStatusTC: (userId: string) => void
    updateStatusTC:(status:string) => void


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
        this.props.getUserProfileTC(userId)
        this.props.getStatusTC(userId)
    }


    render() {
        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatusTC={this.props.updateStatusTC}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status
});


const WithURLDataContainerProfileComponent: ComponentType<ProfileContainerPropsType & any> = withRouter(ProfileContainer)

export default withAuthRedirect(connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    getUserProfileTC,
    getStatusTC,
    updateStatusTC,
})(WithURLDataContainerProfileComponent));

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

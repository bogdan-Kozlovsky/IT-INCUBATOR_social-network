import React, {ComponentType, useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import {getStatusTC, getUserProfileTC, savePhotoTC, saveProfileTC, updateStatusTC} from "../../redux/profile-reducer";
import {Profile} from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {NavigateFunction, Params, useLocation, useNavigate, useParams,} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/WithAuthNavigate";
import {useAppSelector} from "../../common/hook/selectorHook";
import {selectIsAuth, selectProfile} from "../../redux/selectors";





// export type MapStatePropsType = {
//     profile: ProfilePropsType | null
//     isAuth: Boolean
//     status: string
//     authorizedUserId: number | null
// }
// export type MapDispatchToPropsType = {
//     getUserProfileTC: (userId: string) => void
//     getStatusTC: (userId: string) => void
//     updateStatusTC: (status: string) => void
//     //////// typeScript
//     savePhotoTC: any
//     saveProfileTC: (profile: ProfilePropsType) => Promise<any>
// }

type RoutersType = {
    router: {
        location: Location
        params: Params<string>
        navigate: NavigateFunction
    }
}
// export type ProfileContainerPropsType = MapStatePropsType & MapDispatchToPropsType & RoutersType


// class ProfileContainer extends React.Component<ProfileContainerPropsType> {
//
//     refreshProfile() {
//         let userId: any = this.props.router.params.userId
//         if (!userId) {
//             // userId = '2'
//             userId = this.props.authorizedUserId
//         }
//         this.props.getUserProfileTC(userId)
//         this.props.getStatusTC(userId)
//         console.log(userId)
//     }
//
//
//     componentDidMount() {
//         this.refreshProfile()
//     }
//
//     componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>, prevState: Readonly<{}>, snapshot?: any) {
//         if (this.props.router.params.userId !== prevProps.router.params.userId) {
//             this.refreshProfile()
//         }
//     }
//
//
//     render() {
//         return (
//             <div>
//                 <Profile {...this.props}
//                          profile={this.props.profile}
//                          status={this.props.status}
//                          updateStatusTC={this.props.updateStatusTC}
//                          isOwner={!this.props.router.params.userId}
//                          savePhotoTC={this.props.savePhotoTC}
//                 />
//             </div>
//         )
//     }
// }

// let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
//     profile: state.profilePage.profile,
//     isAuth: state.auth.isAuth,
//     status: state.profilePage.status,
//     authorizedUserId: state.auth.id,
// });
//
//
// const WithURLDataContainerProfileComponent: ComponentType<ProfileContainerPropsType & any> = withRouter(ProfileContainer)
//
// // @ts-ignore
// export default withAuthRedirect(connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
//     getUserProfileTC,
//     getStatusTC,
//     updateStatusTC,
//     savePhotoTC,
//     saveProfileTC,
// })(WithURLDataContainerProfileComponent));
//
// export function withRouter<T>(Component: ComponentType<T>): ComponentType<T & WithRouterType> {
//
//     const ComponentWithRouterProp = (props: T & WithRouterType) => {
//         let location = useLocation();
//         let navigate = useNavigate();
//         let params = useParams();
//         return (
//             <Component
//                 {...props}
//                 router={{location, navigate, params}}
//             />
//         );
//     }
//     return ComponentWithRouterProp;
// }
//
// type WithRouterType = Location & NavigateFunction & Readonly<Params<string>>;

// export const ProfileContainer = () => {
//     const dispatch = useDispatch()
//     const {profile, status} = useAppSelector(selectProfile)
//     const {isAuth} = useAppSelector(selectIsAuth)
//     // const userId = useParams()
//     // console.log(userId)
//     const userId = '22141'
//
//     useEffect(() => {
//         if (userId) {
//             dispatch(getUserProfileTC((userId)))
//             dispatch(getStatusTC((userId)))
//         }
//         // }, [userId, dispatch])
//     }, [])
//     return (
//         <div>
//             <Profile
//                 isAuth={isAuth}
//                 profile={profile}
//                 status={status}
//                 isOwner={!userId}
//             />
//         </div>
//     )
// };
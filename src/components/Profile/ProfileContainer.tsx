import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfileAC} from "../../redux/profile-reducer";
import {Profile} from "./Profile";

// type ProfileTypeProps = {
//     profile:any
//     setUserProfile?: (profile:any) => void
// }

export type MapStatePropsType = {
    profile: any
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

let mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile
});

export default connect(mapStateToProps, {setUserProfileAC})(ProfileContainer);

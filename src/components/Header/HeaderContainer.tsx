import React from "react";
import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {InitialStateType, setAuthUserData} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type HeaderTypeProps = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderTypeProps, {}> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    this.props.setAuthUserData(id, email, login, true)
                }
            })
    }

    render() {
        return <Header {...this.props} auth={this.props.auth}/>
    }
}

type MapStateToPropsType = {
    auth: InitialStateType
}
type MapDispatchToPropsType = {
    setAuthUserData: (userId: number, email: string, login: string, isAuth: boolean) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    auth: state.auth
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {setAuthUserData})(HeaderContainer)
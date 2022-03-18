import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {getAuthUserDataThunk, InitialStateType, logoutTC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    auth: InitialStateType
}
type MapDispatchToPropsType = {
    getAuthUserDataThunk: () => void
    logoutTC: () => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    auth: state.auth
})
type HeaderTypeProps = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderTypeProps, {}> {

    componentDidMount() {
        this.props.getAuthUserDataThunk()
    }

    render() {
        return <Header {...this.props} auth={this.props.auth}/>
    }
}


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,
    {getAuthUserDataThunk, logoutTC})
(HeaderContainer)
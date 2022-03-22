import React from 'react';
import './App.css';
import ProfileContainer from "./components/Profile/ProfileContainer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navigation} from "./components/Navigation/Navigation";
import {UsersContainer} from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {connect} from "react-redux";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./common/preloader/Preloader";
import {compose} from "redux";
import {initializeAppTC} from "./redux/app-reducer";


type AppPropsType = MapStateToPropsType & MapDispatchToPropsType

class App extends React.Component<AppPropsType, {}> {
    componentDidMount() {
        this.props.initializeAppTC()
    }

    render() {

        if (this.props.initialized) {
            return <Preloader/>
        }

        return (
            <BrowserRouter>
                <HeaderContainer/>
                <div className='app-wrapper'>
                    <Navigation/>
                    <div className='app-wrapper-content'>
                        <Routes>
                            <Route path='profile/' element={<ProfileContainer/>}/>
                            <Route path='profile/:userId' element={<ProfileContainer/>}/>
                            <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                            <Route path='/users/*' element={<UsersContainer/>}/>
                            <Route path='/news' element={<h2>News</h2>}/>
                            <Route path='/music' element={<h2>Music</h2>}/>
                            <Route path='/settings' element={<h2>Settings</h2>}/>
                            <Route path='/login' element={<Login/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}


type MapStateToPropsType = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeAppTC: () => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({initialized: state.app.initialized})


export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
        initializeAppTC
    }))(App)
import React from 'react';
import './App.css';
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Route, Routes} from "react-router-dom";
import {Navigation} from "./components/Navigation/Navigation";
import {UsersContainer} from "./components/Users/UsersContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./common/preloader/Preloader";
import {compose} from "redux";
import {initializeAppTC} from "./redux/app-reducer";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {Header} from "./components/Header/Header";


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
            <>
                <Header/>
                <div className='app-wrapper'>
                    <Navigation/>
                    <div className='app-wrapper-content'>
                        <Routes>
                            <Route path='profile/' element={<ProfileContainer/>}/>
                            <Route path='profile/:userId' element={<ProfileContainer/>}/>
                            <Route path='/dialogs/*' element={<Dialogs/>}/>
                            <Route path='/users/*' element={<UsersContainer/>}/>
                            <Route path='/news' element={<h2>News</h2>}/>
                            <Route path='/music' element={<h2>Music</h2>}/>
                            <Route path='/settings' element={<h2>Settings</h2>}/>
                            <Route path='/login' element={<Login/>}/>
                        </Routes>
                    </div>
                </div>
            </>
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
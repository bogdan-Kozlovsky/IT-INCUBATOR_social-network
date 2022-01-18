import React, {FC} from 'react';
import {Header} from './component/Header/Header';
import {Navigation} from './component/Navigation/Navigation';
import cn from 'classnames'
import {Profile} from './component/Profile/Profile';
import Dialogs from './component/Dialogs/Dialogs';
import {Route, Routes} from 'react-router-dom';
import News from './component/News/News';
import Music from './component/Music/Music';
import Settings from './component/Settings/Settings';
import {AddPostActionType, RootStateType, UpdateNewPostActionType,} from "./redux/state";

type AppType = {
    state: RootStateType
    dispatch: (action: AddPostActionType | UpdateNewPostActionType) => void
}


export const App: FC<AppType> = (props) => {
    const state = props.state
    return (
        <div>
            <Header/>

            <div className="wrapper app">
                <Navigation/>
                <div className="app__box">
                    <Routes>
                        <Route path={'/'}
                               element={<Profile
                                   posts={state.profilePage.posts}
                                   newPostText={state.profilePage.newPostText}
                                   dispatch={props.dispatch}
                               />}/>
                        <Route path={'/dialogs/*'} element={<Dialogs
                            dialog={state.dialogsPage.dialog}
                            message={state.dialogsPage.message}/>}/>
                        <Route path={'/news'} element={<News/>}/>
                        <Route path={'/music'} element={<Music/>}/>
                        <Route path={'/settings'} element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
        </div>

    );
};

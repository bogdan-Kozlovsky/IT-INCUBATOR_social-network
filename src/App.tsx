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
import {addPost, addPostPropsType, PostsType, RootStateType} from './redux/state';

type AppType = {
    state: RootStateType
    addPost: addPostPropsType
    updateNewPostText: (newPostText: string ) => void
}

export const App: FC<AppType> = (props) => {

    return (
        <div>
            <Header/>

            <div className="wrapper app">
                <Navigation/>
                <div className="app__box">
                    <Routes>
                        <Route path={'/'}
                               element={<Profile
                                   posts={props.state.profilePage.posts}
                                   newPostText={props.state.profilePage.newPostText}
                                   addPost={props.addPost}
                                   updateNewPostText={props.updateNewPostText}
                               />}/>
                        <Route path={'/dialogs/*'} element={<Dialogs
                            dialog={props.state.dialogsPage.dialog} message={props.state.dialogsPage.message}/>}/>
                        <Route path={'/news'} element={<News/>}/>
                        <Route path={'/music'} element={<Music/>}/>
                        <Route path={'/settings'} element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};


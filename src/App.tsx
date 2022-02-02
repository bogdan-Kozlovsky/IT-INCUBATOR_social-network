import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Profile} from "./components/Profile/Profile";
import {Routes, Route, HashRouter} from "react-router-dom";
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {NavbarContainer} from "./components/Navbar/NavbarContainer";

export type AppTypeProps = {}

const App: React.FC<AppTypeProps> = (props) => {

    return (
        <HashRouter>
            <div className='app-wrapper'>
                <Header/>
                <NavbarContainer/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/' element={<Profile/>}/>
                        <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                        <Route path='/news' element={<h2>News</h2>}/>
                        <Route path='/music' element={<h2>Music</h2>}/>
                        <Route path='/settings' element={<h2>Settings</h2>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    );
}

export default App;


// export const App = ({...props}: AppType) => {
//     const state = props.state
//     return (
//         <div>
//             <Header/>
//
//             <div className="wrapper app">
//                 <Navigation/>
//                 <div className="app__box">
//                     <Routes>
//                         <Route path={'/'}
//                                element={<Profile
//                                    posts={state.profilePage.posts}
//                                    newPostText={state.profilePage.newPostText}
//                                    dispatch={props.dispatch}
//                                />}/>
//                         <Route path={'/dialogs/*'} element={<Dialogs
//                             dialog={state.dialogsPage.dialog}
//                             message={state.dialogsPage.message}
//                             dispatch={props.dispatch}
//                             newMessageText={props.state.dialogsPage.newMessageText}
//                         />}/>
//                         <Route path={'/news'} element={<News/>}/>
//                         <Route path={'/music'} element={<Music/>}/>
//                         <Route path={'/settings'} element={<Settings/>}/>
//                     </Routes>
//                 </div>
//             </div>
//         </div>
//
//     );
// };

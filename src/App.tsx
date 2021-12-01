import React, {FC} from 'react';
import {Header} from "./component/Header/Header";
import {Navigation} from "./component/Navigation/Navigation";
import cn from 'classnames'
import {Profile} from "./component/Profile/Profile";
import Dialogs from "./component/Dialogs/Dialogs";
import {Route,Routes} from "react-router-dom";


export const App: FC = () => {
    return (
        <div>
            <Header/>

            <div className="wrapper app">
                <Navigation/>
                <div className="app__box">
                    <Routes>
                        <Route path={'/profile'} element={<Profile/>}/>
                        <Route path={'/dialogs'} element={<Dialogs/>}/>
                    </Routes>
                    {/*<Profile/>*/}
                    {/*<Dialogs/>*/}
                </div>
            </div>
        </div>
    );
};


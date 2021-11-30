import React, {FC} from 'react';
import {Header} from "./component/Header/Header";
import {Navigation} from "./component/Navigation/Navigation";
import cn from 'classnames'
import {Profile} from "./component/Profile/Profile";


export const App: FC = () => {
    return (
        <div>
            <Header/>

            <div className="wrapper app">
                <Navigation/>
                <div className="app__box">
                    <Profile/>
                </div>
            </div>
        </div>
    );
};


import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Error } from './common/Error/Error';
import { useAppSelector } from './common/hook/selectorHook';
import { Preloader } from './common/preloader/Preloader';
import { Dialogs } from './components/Dialogs/Dialogs';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Me } from './components/Me/Me';
import { Navigation } from './components/Navigation/Navigation';
import { Profile } from './components/Profile/Profile';
import { Users } from './components/Users/Users';
import { PATH } from './enums/patch';
import { getAuthUserDataThunk } from './redux/reducer/auth-reducer';
import { selectError, selectInitialized } from './redux/reducer/selectors';

export const App = () => {

  const dispatch = useDispatch();
  const error = useAppSelector(selectError);
  const { progress, initialized } = useAppSelector(selectInitialized);

  useEffect(() => {

    dispatch(getAuthUserDataThunk());
  }, []);

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <>
      <Header />
      {error && <Error />}
      {!progress && <div className='nav'>
        <div className='statusBar' />
      </div>}
      <div className='app-wrapper'>
        <Navigation />
        <Routes>
          <Route path={PATH.ME} element={<Me />} />
          <Route path={`${PATH.PROFILE}/:userId`} element={<Profile />} />
          <Route path={PATH.DIALOGS} element={<Dialogs />} />
          <Route path={PATH.USERS} element={<Users />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={'/*'} element={<div>error</div>} />
        </Routes>
      </div>
    </>
  );
};

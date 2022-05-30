import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { ModalErrorMessage } from './common/ModalErrorMessage/ModalErrorMessage';
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
import { selectIsInitialized, selectIsProgress } from './redux/selectors/app';
import { selectErrorMessage } from './redux/selectors/errorMessage';

import { useAppSelector } from 'types/useAppSelector';

export const App = () => {

  const dispatch = useDispatch();

  const errorMessage = useAppSelector(selectErrorMessage);
  const isProgress = useAppSelector(selectIsProgress);
  const isInitialized = useAppSelector(selectIsInitialized);

  useEffect(() => {
    dispatch(getAuthUserDataThunk());
  }, []);

  if (!isInitialized) {
    return <Preloader />;
  }

  return (
    <>
      <Header />

      {errorMessage && <ModalErrorMessage />}

      {!isProgress && <div className='nav'>
        <div className='statusBar' />
      </div>
      }

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

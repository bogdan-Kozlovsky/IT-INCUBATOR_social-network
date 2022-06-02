import React from 'react';

import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { reset } from 'redux-form';

import { sendMessageAC } from '../../redux/actionCreator/dialogs/actionCreator';
import { DialogType, PostsType } from '../../redux/reducer/dialogs/types';
import { selectIsAuth } from '../../redux/selectors/auth';
import { selectDialogs, selectMessage } from '../../redux/selectors/dialogs';

import s from './Dialogs.module.css';
import { AddMessageFormType } from './types';

import { AddMessageFormRedux } from 'components/AddMessageForm/AddMessageForm';
import { PATH } from 'enums/patch';
import { useAppSelector } from 'types/useAppSelector';

export const Dialogs = () => {

  const dispatch = useDispatch();

  const dialogs = useAppSelector(selectDialogs);
  const messages = useAppSelector(selectMessage);
  const isAuth = useAppSelector(selectIsAuth);

  const dialogsElement = dialogs.map(({ id, name }: PostsType) => (<div className={s.item} key={id}>{name}</div>));
  const messageElement = messages.map(({ id, message }: DialogType) => (
    <div className={s.item} key={id}>{message}</div>));

  const addNewMessage = (values: AddMessageFormType) => {
    dispatch(sendMessageAC(values.newMessageBody));
    dispatch(reset('dialogAddMessageForm'));
  };

  if (!isAuth) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.block}>
        <div className={s.dialogsItems}>
          {dialogsElement}
        </div>
        <div className={s.messages}>
          {messageElement}
        </div>
      </div>

      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};


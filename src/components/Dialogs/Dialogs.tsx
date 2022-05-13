import React from 'react';

import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { reset } from 'redux-form';

import s from './Dialogs.module.css';

import { useAppSelector } from 'common/hook/selectorHook';
import { AddMessageFormRedux } from 'components/AddMessageForm/AddMessageForm';
import { PATH } from 'enums/patch';
import { DialogType, PostsType, sendMessageAC } from 'redux/reducer/dialogs-reducer';
import { selectDialogs, selectIsAuth } from 'redux/reducer/selectors';

// type
export type AddMessageFormType = {
  newMessageBody: string
}

export const Dialogs = () => {
  const dispatch = useDispatch();

  const { dialogs, messages } = useAppSelector(selectDialogs);
  const { isAuth } = useAppSelector(selectIsAuth);

  const dialogsElements = dialogs.map(({ id, name }: PostsType) => (<div className={s.item} key={id}>{name}</div>));
  const messageElements = messages.map(({ id, message }: DialogType) => (
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
          {dialogsElements}
        </div>
        <div className={s.messages}>
          {messageElements}
        </div>
      </div>

      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};


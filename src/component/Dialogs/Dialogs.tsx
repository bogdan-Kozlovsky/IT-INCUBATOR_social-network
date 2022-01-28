import React, {FC} from 'react';
import s from './dialogs.module.scss'
import {DialogsItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Message/Message";

import {AddPostActionType, UpdateNewPostActionType} from "../../redux/profileReducer";
import {SendMessageACType, UpdateNewMessageACType} from "../../redux/dialogsReducer";
import {DialogType, MessageType} from "../../redux/state";

type DialogsPropsType = {
    dialog:Array<DialogType>
    message:Array<MessageType>
    dispatch: (action: AddPostActionType | UpdateNewPostActionType | UpdateNewMessageACType | SendMessageACType) => void
    newMessageText:string
}

const Dialogs = ({dialog, message,...props}:DialogsPropsType) => {

    return (
        <div className={s.dialogs}>
            <h2 className={s.dialogs__title}>Dialogs!</h2>
            <div className={s.dialogs__inner}>
                <ul className={s.dialogs__items}>
                    <DialogsItem dialog={dialog}/>
                </ul>
                <div className={s.dialogs__content}>

                    <Message
                        messages={message}
                        dispatch={props.dispatch}
                        newMessageText={props.newMessageText}
                    />

                </div>
            </div>
        </div>
    );
};

export default Dialogs;
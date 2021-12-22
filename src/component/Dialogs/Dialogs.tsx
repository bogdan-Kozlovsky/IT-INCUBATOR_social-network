import React, {FC} from 'react';
import s from './dialogs.module.scss'
import {DialogsItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Message/Message";
import {DialogType, MessageType} from '../../redux/state';

type DialogsType = {
    dialog:Array<DialogType>
    message:Array<MessageType>
}

const Dialogs:FC<DialogsType> = ({dialog, message}) => {

    return (
        <div className={s.dialogs}>
            <h2 className={s.dialogs__title}>Dialogs!</h2>
            <div className={s.dialogs__inner}>
                <ul className={s.dialogs__items}>
                    <DialogsItem dialog={dialog}/>
                </ul>
                <div className={s.dialogs__content}>

                    <Message  messages={message}/>

                </div>
            </div>
        </div>
    );
};

export default Dialogs;
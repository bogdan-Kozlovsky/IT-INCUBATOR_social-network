import React from 'react';
import s from './dialogs.module.scss'
import {DialogsItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Message/Message";
import {dialog} from "../../state/state";

const Dialogs = () => {

    let dialogs = dialog.map(({pathDialog, name, id}) => {
        return (
            <DialogsItem key={id} pathDialog={pathDialog} name={name}/>
        )
    })


    let message = dialog.map(({id,description}) => {
        return(
            <Message key={id} description={description}/>
        )
    })

    return (
        <div className={s.dialogs}>
            <h2 className={s.dialogs__title}>Dialogs!</h2>
            <div className={s.dialogs__inner}>
                <ul className={s.dialogs__items}>
                    {dialogs}
                </ul>
                <div className={s.dialogs__content}>
                    {message}
                </div>
            </div>
        </div>
    );
};

export default Dialogs;
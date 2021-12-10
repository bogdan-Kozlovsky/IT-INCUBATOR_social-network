import React from 'react';
import s from './dialogs.module.scss'
import {DialogsItem} from "./DialogsItem/DialogsItem";
import {Message} from "./Message/Message";
import {NavLink} from "react-router-dom";

const activeStyle: any = {
    color: '#1565c0',
    transition: 'all 0.7s',
    fontWeight: '600',
}

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <h2 className={s.dialogs__title}>Dialogs!</h2>
            <div className={s.dialogs__inner}>
                <ul className={s.dialogs__items}>
                    <li className={s.dialogs__item}>
                        <NavLink to='/dialogs/1'
                                 style={({isActive}) => isActive ? activeStyle : undefined}
                                 className={s.dialogs__link}>
                            Bogdan
                        </NavLink>
                    </li>
                    <DialogsItem name={'Vasia'} id={1}/>
                    <DialogsItem name={'Vlad'} id={2}/>
                    <DialogsItem name={'Max'} id={3}/>
                    <DialogsItem name={'Bogdan'} id={4}/>
                </ul>
                <div className={s.dialogs__content}>
                    <Message descr={'Hi how are you doing'}/>
                    <Message descr={'I heard that you have problems'}/>
                    <Message descr={'how is your health today'}/>
                    <Message descr={'Where had you been?'}/>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;
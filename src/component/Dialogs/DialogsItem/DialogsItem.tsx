import React, {FC} from 'react';
import s from '../dialogs.module.scss';
import {NavLink} from 'react-router-dom';
import {DialogType} from '../../../redux/state';

type DialogsItemType = {
    dialog: Array<DialogType>
}
export const DialogsItem: FC<DialogsItemType> = ({dialog}) => {

    return (
        <div>
            {dialog.map(el => {
                return (
                    <div key={el.id}>
                        <li className={s.dialogs__item}>
                            <NavLink to={el.pathDialog}
                                     className={({isActive}) => `${s.dialogs__link} ${isActive ? s.dialogs__active : ''}`}>
                                {el.name}
                            </NavLink>
                        </li>
                    </div>
                )
            })}
        </div>
    )
}
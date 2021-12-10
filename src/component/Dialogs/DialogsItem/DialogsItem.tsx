import React, {FC} from "react";
import s from "../dialogs.module.scss";
import {NavLink} from "react-router-dom";

interface DialogsItemProps {
    name: string
    id: number
}

const activeStyle: any = {
    color: '#1565c0',
    transition: 'all 0.7s',
    fontWeight: '600',
}
export const DialogsItem: FC<DialogsItemProps> = ({name, id}) => {
    return (
        <li className={s.dialogs__item}>
            <NavLink to={'/dialogs/' + {id}}
                     style={({isActive}) => isActive ? activeStyle : undefined}
                     className={s.dialogs__link}>
                {name}
            </NavLink>
        </li>
    )
}
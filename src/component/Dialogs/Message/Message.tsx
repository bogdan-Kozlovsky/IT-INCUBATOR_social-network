import s from "../dialogs.module.scss";
import React, {FC} from "react";
import {DialogProps} from "../../../state/state";



export const Message:FC<DialogProps> = ({description}) => {
    return (
        <p className={s.dialogs__descr}>{description}</p>
    )
}
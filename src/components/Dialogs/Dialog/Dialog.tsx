import s from "../Dialogs.module.css";
import React from "react";
// type
type DialogPropsType = {
    dialog: string
}

export const Dialog = (props: DialogPropsType) => {
    const {
        dialog
    } = props
    return (
        <div className={s.dialog}>{dialog}</div>
    )
}
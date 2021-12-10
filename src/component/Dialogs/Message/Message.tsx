import s from "../dialogs.module.scss";
import React, {FC} from "react";

interface MessageProps {
    descr:string
}

export const Message:FC<MessageProps> = ({descr}) => {
    return (
        <p className={s.dialogs__descr}>{descr}</p>
    )
}
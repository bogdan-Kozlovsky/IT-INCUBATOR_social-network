import s from "./StyleNavLinkDialog.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

type StyledNavLinkDialogProps = {
    name: string
    pathDialog: string
}

export const StyledNavLinkDialog: React.FC<StyledNavLinkDialogProps> = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink className={({isActive}) => `${s.dialog} ${isActive ? s.active : ''}`} to={props.pathDialog}>{props.name}</NavLink>
        </div>
    )
}
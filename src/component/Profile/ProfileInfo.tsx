import style from "./profile.module.scss";
import React, {FC} from "react";

interface ProfileInfoProps{
    url:string
}

export const ProfileInfo:FC<ProfileInfoProps> = ({url}) => {
    return (
        <img className={style.profile__avatar} src={url} alt='avatar'/>
    )
}
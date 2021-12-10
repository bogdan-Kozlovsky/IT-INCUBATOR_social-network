import style from "./profile.module.scss";
import React, {FC} from "react";

interface ProfileDescrProps {
    name: string
    country: string
    city: string
    age: number
}

export const ProfileDescr: FC<ProfileDescrProps> = (
    {name, country, city, age}) => {
    return (
        <div className={style.profile__descr}>
            <h2 className={style.profile__name}>{name}</h2>
            <ul className={style.profile__list}>
                <li className={style.profile__item}>
                    Country:<span>{country}</span>
                </li>
                <li className={style.profile__item}>
                    City: <span>{city}</span></li>
                <li className={style.profile__item}>
                    Age: <span>{age}</span></li>
            </ul>
        </div>
    )
}
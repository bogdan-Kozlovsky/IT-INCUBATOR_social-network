import React, {useState} from 'react';
import {useAppSelector} from "../hook/selectorHook";
import {selectError} from "../../redux/reducer/selectors";
import style from './error.module.css'

export const Error = () => {
    const error = useAppSelector(selectError)
    return (
        <div className={style.wrapper}>
            <div className={style.block}>
                {error}
            </div>
        </div>
    );
};


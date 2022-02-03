import React from "react";
import s from './Header.module.css'

export const Header = () => {
    return (
        <header className={s.header}>
            <div style={{width: '1200px', margin: '0 auto',padding:'10px'}}>
                <img
                    src='http://pngimg.com/uploads/magic_hat/small/magic_hat_PNG102.png' alt={'img'}/>
            </div>
        </header>
    )
}

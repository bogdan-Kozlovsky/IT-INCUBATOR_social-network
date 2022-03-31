import s from "./Post.module.css";
import React, {FC} from "react";

// type
type PostPropsType = {
    message: string | undefined
    likesCount?: number
}

export const Post: FC<PostPropsType> = (props) => {

    const {
        message,
        likesCount,
    } = props

    return (
        <div>
            <div className={s.item}>
                <img src='https://cdn.pixabay.com/photo/2017/01/26/13/00/mom-2010524__340.png' alt={'logo'}/>
                <span>{message}</span>
                <div><span> like {likesCount}</span></div>
            </div>
        </div>
    )
}
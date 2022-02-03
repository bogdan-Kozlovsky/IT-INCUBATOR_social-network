import s from "./Post.module.css";
import React, {FC} from "react";

type PostPropsType = {
    message: string| undefined
    likesCount?: number
}

export const Post: FC<PostPropsType> = (props) => {
    return (
        <div>
            <div className={s.item}>
                <img src='https://cdn.pixabay.com/photo/2017/01/26/13/00/mom-2010524__340.png' alt={'logo'}/>
                <span>{props.message}</span>
                <div><span> like {props.likesCount}</span></div>
            </div>
        </div>
    )
}
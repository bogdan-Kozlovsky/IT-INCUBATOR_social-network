import React from "react";
import {addPostAC, RouteType} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type MapStateToProps = {
    posts: Array<RouteType>,
}
type MapDispatchToProps = {
    addPost: (newPostBody:string) => void,
}
export type MyPostPropsType = MapStateToProps & MapDispatchToProps
const mapStateToProps = (state: AppStateType): MapStateToProps => {
    return {
        posts: state.profilePage.posts,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => {
    return {
        addPost: (newPostBody:string) => dispatch(addPostAC(newPostBody)),
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
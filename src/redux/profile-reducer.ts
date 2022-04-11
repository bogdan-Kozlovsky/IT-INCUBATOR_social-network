import {ProfilePropsType} from "../components/Profile/ProfileContainer";
import {profileAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppStateType} from "./redux-store";
import {stopSubmit} from "redux-form";

// type
export type RouteType = {
    likesCount: number
    message: string
    id: number
}
export type ProfileType = {
    posts: Array<RouteType>
    profile: ProfilePropsType | null
    status: string
}
type GlobalReducerType =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setStatusAC>

// initialState
let initialState: ProfileType = {
    posts: [
        {id: 1, message: 'Hi,how are you', likesCount: 12},
        {id: 2, message: 'Hi, you', likesCount: 11},
        {id: 3, message: 'Hi,how are you', likesCount: 11},
        {id: 4, message: 'how are you', likesCount: 12}
    ],
    profile: null,
    status: '',
}
//
// reduce
export const profileReducer = (state: ProfileType = initialState, action: GlobalReducerType): ProfileType => {
    switch (action.type) {
        case 'ADD-POST':
            return {
                ...state,
                posts: [...state.posts, {id: 5, message: action.newPostBody, likesCount: 0,}]
            }

        case "SET-USER-PROFILE":
            return {...state, profile: action.profile}
        case "SET-STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}

// action Creator
export const addPostAC = (newPostBody: string) => ({type: 'ADD-POST', newPostBody} as const)
export const setUserProfileAC = (profile: ProfilePropsType) => ({type: 'SET-USER-PROFILE', profile} as const)
export const setStatusAC = (status: string) => ({type: 'SET-STATUS', status} as const)
export const savePhotoSuccessAC = (photos: any) => {
    return {
        type: 'SAVE-PHOTO-SUCCESS',
        photos
    } as const
}
// thunk
export const getUserProfileTC = (userId: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfileAC(response.data))
}
export const getStatusTC = (userId: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatusAC(response.data))
}
export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status))
    }
}

export const savePhotoTC = (file: any) => async (dispatch: Dispatch) => {
    debugger
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(response.data.data.photos))
    }
}

export const saveProfileTC = (profile: ProfilePropsType) => async (dispatch: Dispatch, getState: () => AppStateType) => {
    debugger
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        debugger
        // @ts-ignore
        dispatch(getUserProfileTC(userId));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
}





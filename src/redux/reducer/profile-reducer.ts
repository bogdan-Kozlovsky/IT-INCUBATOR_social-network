import {profileAPI} from "../../api/api";
import {Dispatch} from "redux";
import {AppStateType} from "../redux-store";
import {stopSubmit} from "redux-form";
import {v1} from "uuid";
import {ErrorFunc} from "../../common/hook/selectorHook";

// type
export type ContactsPropsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosPropsType = { large: string, small: string }
export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsPropsType
    photos: PhotosPropsType
}

export type RouteType = {
    likesCount: number
    message: string
    id: string
}
export type initialType = {
    posts: Array<RouteType>
    profile: ProfileType | null
    status: string
}
type GlobalReducerType =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof counterAC>

// initialState
let initialState: initialType = {
    posts: [
        {id: v1(), message: 'Hi,how are you', likesCount: 0},
        {id: v1(), message: 'Hi, you', likesCount: 1},
        {id: v1(), message: 'Hi,how are you', likesCount: 0},
        {id: v1(), message: 'how are you', likesCount: 0}
    ],
    profile: null,
    status: '',
}
//
// reduce
export const profileReducer = (state: initialType = initialState, action: GlobalReducerType): initialType => {
    switch (action.type) {
        case 'ADD-POST':
            return {
                ...state,
                posts: [...state.posts, {id: v1(), message: action.newPostBody, likesCount: 0,}]
            }
        case "SET-USER-PROFILE":
            return {...state, profile: action.profile}
        case "SET-STATUS":
            return {...state, status: action.status}
        case "COUNTER": {
            return {
                ...state,
                posts: [...state.posts.map(e => e.id === action.id ? {...e, likesCount: action.likesCount} : e)]
            }
        }
        default:
            return state
    }
}

// action Creator
export const addPostAC = (newPostBody: string) => ({type: 'ADD-POST', newPostBody} as const)
export const counterAC = (id: string, likesCount: number) => ({type: 'COUNTER', id, likesCount} as const)
export const setUserProfileAC = (profile: ProfileType) => ({type: 'SET-USER-PROFILE', profile} as const)
export const setStatusAC = (status: string) => ({type: 'SET-STATUS', status} as const)
export const savePhotoSuccessAC = (photos: any) => {
    return {
        type: 'SAVE-PHOTO-SUCCESS',
        photos
    } as const
}
// thunk
export const getUserProfileTC = (userId: any) => async (dispatch: Dispatch) => {
    try {
        const response = await profileAPI.getProfile(userId)
        dispatch(setUserProfileAC(response.data))
    } catch (error) {
        if (error instanceof Error) {
            const {name} = error
            ErrorFunc(name, dispatch)
        }
    }
}
export const getStatusTC = (userId: number) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await profileAPI.getStatus(userId)
            dispatch(setStatusAC(response.data.status))
        } catch (error) {
            if (error instanceof Error) {
                const {name} = error
                ErrorFunc(name, dispatch)
            }
        }

    };
}
export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
    try {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatusAC(status))
        }
    }catch (error) {
        if (error instanceof Error) {
            const {name} = error
            ErrorFunc(name, dispatch)
        }
    }

}

export const savePhotoTC = (file: any) => async (dispatch: Dispatch) => {
    try {
        let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccessAC(response.data.data.photos))
        }
    }catch (error) {
        if (error instanceof Error) {
            const {name} = error
            ErrorFunc(name, dispatch)
        }
    }

}

export const saveProfileTC = (profile: ProfileType) => async (dispatch: Dispatch, getState: () => AppStateType) => {
    try {
        const userId = getState().auth.id;
        const response = await profileAPI.saveProfile(profile);

        if (response.data.resultCode === 0) {
            // @ts-ignore
            dispatch(getUserProfileTC(userId));
        } else {
            dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
            return Promise.reject(response.data.messages[0]);
        }
    }catch (error) {
        if (error instanceof Error) {
            const {name} = error
            ErrorFunc(name, dispatch)
        }
    }

}





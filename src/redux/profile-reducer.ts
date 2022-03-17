import {ProfilePropsType} from "../components/Profile/ProfileContainer";
import {profileAPI} from "../api/api";
import {Dispatch} from "redux";

// type
export type RouteType = {
    likesCount: number
    message: string
    id: number
}
export type ProfileType = {
    posts: Array<RouteType>
    // newPostText: string,
    profile: ProfilePropsType | null
    status: string
}
type NewPostType = {
    id: number
    message: string
    likesCount: number
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

// reduce
export const profileReducer = (state: ProfileType = initialState, action: GlobalReducerType): ProfileType => {
    switch (action.type) {
        case 'ADD-POST':
            let newPost: NewPostType = {id: 5, message: action.newPostBody, likesCount: 0,}
            return {
                ...state,
                posts: [...state.posts, newPost]
            }

        case "SET-USER-PROFILE": {
            return {...state, profile: action.profile}
        }
        case "SET-STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state
    }
}

// action Creator
export const addPostAC = (newPostBody:string) => {
    return {
        type: 'ADD-POST',
        newPostBody
    } as const
}
export const setUserProfileAC = (profile: ProfilePropsType) => {
    return {
        type: 'SET-USER-PROFILE',
        profile
    } as const
}
export const setStatusAC = (status: string) => {
    return {
        type: 'SET-STATUS',
        status
    } as const
}

// thunk
export const getUserProfileTC = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfileAC(response.data))
        });
}
export const getStatusTC = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatusAC(response.data))
        });
}
export const updateStatusTC = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatusAC(status))
            }
        })
}



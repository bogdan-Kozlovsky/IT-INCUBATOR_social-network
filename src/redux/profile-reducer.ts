export type RouteType = {
    likesCount: number
    message: string
    id: number
}
export type ProfileType = {
    posts: Array<RouteType>
    newPostText: string,
    profile: any
}
type NewPostType = {
    id: number
    message: string
    likesCount: number
}

type GlobalReducerType =
    AddPostACType
    | UpdateNewPostTextACType
    | SetUserProfileACType


let initialState: ProfileType = {
    posts: [
        {id: 1, message: 'Hi,how are you', likesCount: 12},
        {id: 2, message: 'Hi, you', likesCount: 11},
        {id: 3, message: 'Hi,how are you', likesCount: 11},
        {id: 4, message: 'how are you', likesCount: 12}
    ],
    newPostText: '',
    profile: null
}

export const profileReducer = (state: ProfileType = initialState, action: GlobalReducerType): ProfileType => {

    switch (action.type) {
        case 'ADD-POST':
            let newPost: NewPostType = {id: 5, message: state.newPostText, likesCount: 0,}
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            }
        case 'UPDATE-NEW-POST-TEXT': {
            return {
                ...state,
                newPostText: action.text
            }
        }
        case "SET-USER-PROFILE": {
            return {...state, profile: action.profile}
        }
        default:
            return state
    }
}

type AddPostACType = ReturnType<typeof addPostAC>
export const addPostAC = () => {
    return {
        type: 'ADD-POST',
    } as const
}

type UpdateNewPostTextACType = ReturnType<typeof updateNewPostTextAC>
export const updateNewPostTextAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        text: newText
    } as const
}


type SetUserProfileACType = ReturnType<typeof setUserProfileAC>
export const setUserProfileAC = (profile: null) => {
    return {
        type: 'SET-USER-PROFILE',
        profile
    } as const
}
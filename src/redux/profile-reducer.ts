import {GlobalReducerType} from "./dialogs-reducer";
import {setUsersAC, UserType} from "./users-reducer";

export type AddPostActionType = {
    type: 'ADD-POST'
}

export type UpdateNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    text: string
}
export type RouteType = {
    likesCount: number
    message: string
    id: number
}
export type ProfileType = {
    posts: Array<RouteType>
    newPostText: string,
}
type NewPostType = {
    id: number
    message: string
    likesCount: number
}
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export const addPostAC = (): AddPostActionType => ({type: ADD_POST})
export const updateNewPostTextAC = (newText: string): UpdateNewPostTextActionType => ({
    type: UPDATE_NEW_POST_TEXT,
    text: newText
})


// export type UpdateNewPostTextACType = ReturnType<typeof updateNewPostTextAC>
// export const updateNewPostTextAC = (users: Array<UserType>) => {
//     return {
//         type: 'SET-USER',
//         payload: {
//             users
//         }
//     } as const
// }

let initialState: ProfileType = {
    posts: [
        {id: 1, message: 'Hi,how are you', likesCount: 12},
        {id: 2, message: 'Hi, you', likesCount: 11},
        {id: 3, message: 'Hi,how are you', likesCount: 11},
        {id: 4, message: 'how are you', likesCount: 12}
    ],
    newPostText: '',
}

export const profileReducer = (state: ProfileType = initialState, action: GlobalReducerType): ProfileType => {

    switch (action.type) {
        case ADD_POST:
            let newPost: NewPostType = {id: 5, message: state.newPostText, likesCount: 0,}
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.text
            }
        }
        default:
            return state
    }
}
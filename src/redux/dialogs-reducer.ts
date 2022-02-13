import {AddPostActionType, SetUserProfileActionType, UpdateNewPostTextActionType} from "./profile-reducer";


export type UpdateNewMessageBodyActionType = {
    type: "UPDATE-NEW-MESSAGE-BODY"
    body: string
}
export type SendMessageActionType = {
    type: "SEND-MESSAGE"

}
type DialogType = {
    message: string
    id: number
}
type PostsType = {
    name: string
    id: number
}
export type GlobalReducerType =
    AddPostActionType
    | UpdateNewPostTextActionType
    | UpdateNewMessageBodyActionType
    | SendMessageActionType
    | SetUserProfileActionType

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

export const updateNewMessageBodyAC = (newText: string): UpdateNewMessageBodyActionType => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: newText
})
export const sendMessageAC = (): SendMessageActionType => ({
    type: SEND_MESSAGE

})

export type InitialStateType = {
    dialogs: Array<PostsType>
    messages: Array<DialogType>
    newMessageBody: string
}

let initialState: InitialStateType = {

    dialogs: [
        {id: 1, name: 'Slava'},
        {id: 2, name: 'Borya'},
        {id: 3, name: 'Igor'},
        {id: 4, name: 'Viktor'}
    ],
    messages: [
        {id: 1, message: 'Hi how are you doing'},
        {id: 2, message: 'I heard that you have problems'},
        {id: 3, message: 'how is your health today'},
        {id: 4, message: 'Where had you been?'},
    ],
    newMessageBody: "",
}

export const dialogsReducer = (state: InitialStateType = initialState, action: GlobalReducerType): InitialStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            let body = state.newMessageBody
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state
    }
}
type DialogType = {
    message: string
    id: number
}
type PostsType = {
    name: string
    id: number
}
type GlobalReducerType =
    | UpdateNewMessageBodyActionType
    | SendMessageActionType

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
        case "UPDATE-NEW-MESSAGE-BODY":
            return {
                ...state,
                newMessageBody: action.body
            }
        case  "SEND-MESSAGE":
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


type UpdateNewMessageBodyActionType = ReturnType<typeof updateNewMessageBodyAC>
export const updateNewMessageBodyAC = (newText: string) => {
    return {
        type: "UPDATE-NEW-MESSAGE-BODY",
        body: newText
    } as const
}

type SendMessageActionType = ReturnType<typeof sendMessageAC>
export const sendMessageAC = () => {
    return {
        type: "SEND-MESSAGE"
    } as const

}
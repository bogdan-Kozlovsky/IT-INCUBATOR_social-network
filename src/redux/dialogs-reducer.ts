// type
type DialogType = {
    message: string
    id: number
}
type PostsType = {
    name: string
    id: number
}
type GlobalReducerType =
    | ReturnType<typeof sendMessageAC>

export type InitialStateType = {
    dialogs: Array<PostsType>
    messages: Array<DialogType>
}

// initialState
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
}

// reducer
export const dialogsReducer = (state: InitialStateType = initialState, action: GlobalReducerType): InitialStateType => {
    switch (action.type) {
        case  "SEND-MESSAGE":
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state
    }
}

// action Creator
export const sendMessageAC = (newMessageBody: string) => {
    return {
        type: "SEND-MESSAGE",
        newMessageBody
    } as const

}
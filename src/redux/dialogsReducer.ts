import React from 'react';
import {DialogsPageType, GenericType} from "./state";

export type UpdateNewMessageACType = {
    type: 'UPDATE-NEW-MESSAGE-BODY'
    body: string
}
// type updateNewMessageACType = ReturnType<typeof updateNewMessageAC>
export const updateNewMessageAC = (body: string): UpdateNewMessageACType => {
    return {
        type: 'UPDATE-NEW-MESSAGE-BODY',
        body: body
    }
}
export type SendMessageACType = {
    type: 'SEND-MESSAGE'
}
// export type sendMessageACType = ReturnType<typeof sendMessageAC>
export const sendMessageAC = (): SendMessageACType => {
    return {
        type: 'SEND-MESSAGE'
    }
}

let initialState: DialogsPageType = {
    dialog: [
        {pathDialog: '/dialogs/1', name: 'Vasil', id: 1},
        {pathDialog: '/dialogs/2', name: 'Vlad', id: 2},
        {pathDialog: '/dialogs/3', name: 'Max', id: 3},
        {pathDialog: '/dialogs/4', name: 'Bogdan', id: 4},
    ],
    message: [
        {id: 1, description: 'Hi how are you doing'},
        {id: 2, description: 'I heard that you have problems'},
        {id: 3, description: 'how is your health today'},
        {id: 4, description: 'Where had you been?'},
    ],
    newMessageText: ''
}
export const dialogsReducer = (state = initialState, action: GenericType) => {
    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-BODY": {
            state.newMessageText = action.body
            return {...state}
        }
        case "SEND-MESSAGE": {
            let body = state.newMessageText
            state.newMessageText = ''
            state.message.push({id: 6, description: body})
            return {...state}
        }
        default:
            return state
    }
};


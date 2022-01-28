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
export const dialogsReducer = (state: DialogsPageType, action: GenericType) => {
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


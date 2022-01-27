import React from 'react';
import {DialogsPageType, GenericType} from "./state";

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


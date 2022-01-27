import React, {FC, useState} from 'react';
import {
    AddPostActionType,
    MessageType,
    sendMessageAC, SendMessageACType,
    updateNewMessageAC, UpdateNewMessageACType, UpdateNewPostActionType
} from "../../../redux/state";


type MessagePropsType = {
    messages: Array<MessageType>
    dispatch: (action: AddPostActionType | UpdateNewPostActionType | UpdateNewMessageACType | SendMessageACType) => void
    newMessageText: string
}

export const Message = ({messages, ...props}: MessagePropsType) => {

    const newMessage = React.createRef<HTMLTextAreaElement>()

    const addMessage = () => {
        // let text = newMessage.current?.value
        props.dispatch(sendMessageAC())
    }
    const onMessageChange = () => {
        let text: string = newMessage.current?.value || ''
        props.dispatch(updateNewMessageAC(text))
    }


    return (
        <div>
            {messages.map(el => <div>
                <span>{el.id}.</span>
                <p>{el.description}</p>
            </div>)}
            <div>
                <textarea ref={newMessage}
                          value={props.newMessageText}
                          onChange={onMessageChange}
                />
                <button onClick={addMessage}>Add</button>
            </div>
        </div>
    )
}
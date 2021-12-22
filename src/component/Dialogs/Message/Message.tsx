import React, {FC} from 'react';
import {MessageType} from '../../../redux/state';

type MessagePropsType = {
    messages: Array<MessageType>
}

export const Message: FC<MessagePropsType> = ({messages}) => {

    const newMessage = React.createRef<HTMLTextAreaElement>()
    const addMessage = () => {
        let text = newMessage.current?.value
        console.log(text)
    }
    return (
        <div>
            {messages.map(el => <div>
                <span>{el.id}.</span>
                <p>{el.description}</p>
            </div>)}
            <div>
                <textarea ref={newMessage}/>
                <button onClick={addMessage}>Add</button>
            </div>
        </div>
    )
}
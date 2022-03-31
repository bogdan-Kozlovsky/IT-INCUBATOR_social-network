import React from "react";
import s from './Dialogs.module.css'
import {Dialog} from "./Dialog/Dialog";
import {UsersPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

// type
type AddMessageFormType = {
    newMessageBody: string
}

export const Dialogs = (props: UsersPropsType) => {
    const {
        dialogsPage,
        sendMessage,
    } = props

    let dialogsElements = dialogsPage.dialogs.map(({id, name}) =>
        (<div key={id}>{name}</div>))
    let messageElements = dialogsPage.messages.map(({id, message}) =>
        (<div key={id}><Dialog dialog={message}/></div>))
    const addNewMessage = (values: AddMessageFormType) => {
        sendMessage(values.newMessageBody)
    }
    // внимательно
    // if (!props.isAuth    ) return <Navigate to={'/login'}/>
    // внимательно

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messageElements}
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>

        </div>
    )
}


const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component='textarea'
                name='newMessageBody'
                style={{resize: "none"}}
                placeholder='Enter your message'
            />
            <div>
                <button>Add message</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm<AddMessageFormType>({form: 'dialogAddMessageForm'})(AddMessageForm)
import React from "react";
import s from './Dialogs.module.css'
import {useDispatch} from "react-redux";
import {sendMessageAC} from "../../redux/dialogs-reducer";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../common/hook/selectorHook";
import {selectDialogs, selectIsAuth} from "../../redux/selectors";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

// type
type AddMessageFormType = {
    newMessageBody: string
}

export const Dialogs = () => {
    const dispatch = useDispatch()

    const {dialogs, messages} = useAppSelector(selectDialogs)
    const isAuth = useAppSelector(selectIsAuth)


    let dialogsElements = dialogs.map(({id, name}) => (<div key={id}>{name}</div>))
    let messageElements = messages.map(({id, message}) => (<div key={id}>{message}</div>))


    const addNewMessage = (values: AddMessageFormType) => {
        dispatch(sendMessageAC(values.newMessageBody))
    }

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }

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
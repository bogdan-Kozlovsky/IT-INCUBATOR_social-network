import React from "react";
import s from './Dialogs.module.css'
import {useDispatch} from "react-redux";
import {sendMessageAC} from "../../redux/reducer/dialogs-reducer";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../common/hook/selectorHook";
import {selectDialogs, selectIsAuth} from "../../redux/reducer/selectors";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {PATH} from "../../enums/patch";

// type
type AddMessageFormType = {
    newMessageBody: string
}


export const Dialogs = () => {
    const dispatch = useDispatch()

    const {dialogs, messages} = useAppSelector(selectDialogs)
    const {isAuth} = useAppSelector(selectIsAuth)


    let dialogsElements = dialogs.map(({id, name}) => (<div className={s.item} key={id}>{name}</div>))
    let messageElements = messages.map(({id, message}) => (<div className={s.item} key={id}>{message}</div>))


    const addNewMessage = (values: AddMessageFormType) => {
        dispatch(sendMessageAC(values.newMessageBody))
    }

    if (!isAuth) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={s.wrapper}>
            <div className={s.block}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    {messageElements}
                </div>
            </div>

            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}


const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component='textarea'
                name='newMessageBody'
                className='textArea'
                placeholder='Enter your message'
            />
            <div>
                <button className='btn'>Add message</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm<AddMessageFormType>({form: 'dialogAddMessageForm'})(AddMessageForm)
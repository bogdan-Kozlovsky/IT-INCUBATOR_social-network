import {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {updateStatusTC} from "../../../redux/reducer/profile-reducer";
import pencil from '../../../assets/images/pencil.svg'
import s from './ProfileInfo.module.css'

type PropsType = {
    status: string
    userId: string | undefined
    myId: string | undefined
}

export const ProfileStatus = (props: PropsType) => {
    const dispatch = useDispatch()

    const {status, userId, myId} = props
    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(status)


    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatusTC(value))
    }
    const activeEditMode = () => {
        setEditMode(true)
    }
    return (
        <div>
            {editMode
                ? <input
                    className={s.statusInput}
                    onChange={onStatusChange}
                    onBlur={deactivateEditMode}
                    autoFocus type="text"
                    placeholder={'change profile status'}
                    value={value}
                />
                : <div onDoubleClick={activeEditMode} className={s.statusBox}>
                    <b>status:</b>
                    <span>{status || 'изменить статус профиля'}</span>
                    <img className={s.pencilDecor} src={pencil} alt="pencil"/>
                </div>
            }
        </div>
    )
}


import {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {updateStatusTC} from "../../../redux/profile-reducer";

type PropsType = {
    status: string
}

export const ProfileStatus = (props: PropsType) => {
    const dispatch = useDispatch()

    const {status} = props
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
                    onChange={onStatusChange}
                    onBlur={deactivateEditMode}
                    autoFocus type="text"
                    placeholder={'description'}
                    value={value}
                />
                : <div><b>status:</b><span onDoubleClick={activeEditMode}>{props.status || '-----'}</span></div>
            }
        </div>
    );
};


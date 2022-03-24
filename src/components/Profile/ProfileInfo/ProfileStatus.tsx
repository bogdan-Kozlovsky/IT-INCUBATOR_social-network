import {ChangeEvent, useEffect, useState} from "react";

type PropsType = {
    status: string
    updateStatusTC: (status: string) => void
}

export const ProfileStatus = ({...props}: PropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(props.status)

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatusTC(value)
    }
    const activeEditMode = () => {
        setEditMode(true)
    }


    useEffect(() => {
        setValue(props.status);
    }, [props.status]);

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
                : <span onDoubleClick={activeEditMode}>{props.status || '-----'}</span>
            }
        </div>
    );
};


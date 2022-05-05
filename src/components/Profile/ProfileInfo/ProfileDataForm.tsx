import {InjectedFormProps, reduxForm} from "redux-form";
import {initialType, ProfileType} from "../../../redux/reducer/profile-reducer";
import {FC} from "react";
import {createField, GetStringKeys, Input, Textarea} from "../../../common/FromControls/FormControls";

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: FC<InjectedFormProps<initialType, PropsType> & PropsType> = (
    {handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>save</button>
            </div>
            {error && <div>
                {error}
            </div>
            }
            <div>
                <b>Full name</b>: {(createField<ProfileTypeKeys>("Full name", "fullName", [], Input))}
            </div>
            <div>
                <b>Looking for a
                    job</b>: {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>

            <div>
                <b>My professional skills</b>:
                {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>


            <div>
                <b>About me</b>:
                {createField("About me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile?.contacts).map(key => {
                return <div key={key}>
                    <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
                </div>
            })}
            </div>
        </form>
    )
}

// @ts-ignore
export const ProfileDataFormReduxForm = reduxForm<ProfilePropsType, PropsType>({form: 'edit-profile'})(ProfileDataForm)


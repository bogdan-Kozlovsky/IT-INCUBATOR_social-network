import {InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "../../../redux/profile-reducer";
import {FC} from "react";
import {createField, GetStringKeys, Input, Textarea} from "../../../common/FromControls/FormControls";

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

// export const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType>
export const ProfileDataForm = () => {
    return (
        <div>form</div>
        // <form onSubmit={handleSubmit}>
        //     <div>
        //         <button>save</button>
        //     </div>
        //     {error && <div>
        //         {error}
        //     </div>
        //     }
        //     <div>
        //         <b>Full name</b>: {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
        //     </div>
        //     <div>
        //         <b>Looking for a
        //             job</b>: {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {type: "checkbox"})}
        //     </div>
        //
        //     <div>
        //         <b>My professional skills</b>:
        //         {createField<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea)}
        //     </div>
        //
        //
        //     <div>
        //         <b>About me</b>:
        //         {createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea)}
        //     </div>
        //     <div>
        //         <b>Contacts</b>: {Object.keys(profile.profile?.contacts).map(key => {
        //         return <div key={key}>
        //             <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
        //         </div>
        //     })}
        //     </div>
        // </form>
    )
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)


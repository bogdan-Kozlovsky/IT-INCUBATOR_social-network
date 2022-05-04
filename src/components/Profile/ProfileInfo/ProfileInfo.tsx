import s from './ProfileInfo.module.css'
import {Preloader} from "../../../common/preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus";
import usersIcons from "../../../assets/images/users.png";
import {ChangeEvent, useState} from "react";
import {ProfileDataFormReduxForm} from "./ProfileDataForm";
import {useDispatch} from "react-redux";
import {ProfileType, savePhotoTC, saveProfileTC} from "../../../redux/profile-reducer";
import {useAppSelector} from "../../../common/hook/selectorHook";
import {selectIsAuth} from "../../../redux/selectors";

type propsType = {
    profile: ProfileType | null
    status: string
    userId: string | undefined
    // userId: any
}
export const ProfileInfo = ({profile, status, userId}: propsType) => {
    const dispatch = useDispatch()
    let [editMode, setEditMode] = useState<boolean>(false);
    const {id} = useAppSelector(selectIsAuth)

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files.length) {
            dispatch(savePhotoTC(e.currentTarget.files[0]))
        }
    }


    const onSubmit = (formData: ProfileType) => {
        dispatch(saveProfileTC(formData))
        setEditMode(false)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.changeAvatarBox}>
                <img className={s.images} src={profile.photos.large || usersIcons} alt='img'/>
                <label className={s.label}>
                    change avatar
                    <input className={s.inputFile} type="file" onChange={onMainPhotoSelected}/>
                </label>
            </div>

            <div className={s.dataChangesBox}>
                <h2 className={s.title}>User information:</h2>
                <ProfileStatus status={status}/>
                {editMode
                    ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} goToEditMode={() => setEditMode(true)}/>}

                {id === userId &&
                    <button className={s.edit} onClick={() => setEditMode(!editMode)}>Edit information ✎</button>}
            </div>
        </div>
    )
}


type ProfileDataPropsType = {
    profile: ProfileType
    goToEditMode: () => void
}

// const ProfileData = ({profile, goToEditMode}: ProfileDataPropsType) => {
const ProfileData = ({profile, goToEditMode}: any) => {
    return (
        <table>
            <tbody className={s.tbody}>
            <tr>
                <td>Full name:</td>
                <td>{profile.fullName}</td>
            </tr>
            <tr>
                <td>About me:</td>
                <td>{profile.aboutMe}</td>
            </tr>
            <tr>
                <td>Looking for a job:</td>
                <td>{profile.lookingForAJob ? 'yes' : 'not'}</td>
            </tr>

            {profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>:{profile.lookingForAJob}
                </div>
            }
            <div>
            </div>
            <b>Contacts</b>: {
                Object
                    .keys(profile.contacts)
                    .map((key) => {
                        return <div key={key}>
                            {
                                profile.contacts[key] !== null
                                &&
                                <Contact contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                            }

                        </div>
                    })}
            </tbody>

        </table>
    )
}

const Contact = ({contactTitle, contactValue}: ContactsPropsType) => {
    return <table>
        <tbody>
        <tr>
            <td>{contactTitle}:</td>
            <td>{contactValue}</td>
        </tr>
        </tbody>

    </table>

}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}












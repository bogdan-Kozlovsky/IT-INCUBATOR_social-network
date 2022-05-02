import s from './ProfileInfo.module.css'
import {Preloader} from "../../../common/preloader/Preloader";
import {ProfilePropsType} from "../ProfileContainer";
import {ProfileStatus} from "./ProfileStatus";
import usersIcons from "../../../assets/images/users.png";
import {ChangeEvent, useState} from "react";
import {ProfileDataFormReduxForm} from "./ProfileDataForm";
import {useDispatch} from "react-redux";
import {savePhotoTC, saveProfileTC} from "../../../redux/profile-reducer";
import {useAppSelector} from "../../../common/hook/selectorHook";
import {selectIsAuth} from "../../../redux/selectors";

type propsType = {
    profile: ProfilePropsType | null
    status: string
    // userId: number | null
    userId: any
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


    const onSubmit = (formData: ProfilePropsType) => {
        dispatch(saveProfileTC(formData))
        setEditMode(false)
    }

    return (
        <div>
            <div>
                <img style={{borderRadius: '20px', width: '200px'}} src={profile.photos.large || usersIcons} alt='img'/>
            </div>
            {id === userId && <button onClick={() => setEditMode(!editMode)}>EDIT</button>}

            {editMode && <input type="file" onChange={onMainPhotoSelected}/>}
            {editMode
                ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                : <ProfileData profile={profile} goToEditMode={() => setEditMode(true)}/>}


            <div className={s.avatar}>
                <img style={{borderRadius: '20px'}} src={profile?.photos.small || usersIcons}
                     alt='avatar'/>
                <ProfileStatus status={status}/>
            </div>
        </div>
    )
}


type ProfileDataPropsType = {
    profile: ProfilePropsType
    goToEditMode: () => void
}

// const ProfileData = ({profile, goToEditMode}: ProfileDataPropsType) => {
const ProfileData = ({profile, goToEditMode}: any) => {
    return (
        <div>
            <div><b>Full name:</b>{profile.fullName}</div>

            <p>{profile.aboutMe}</p>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'not'}
            </div>

            {profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>:{profile.lookingForAJob}
                </div>
            }
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <b>Contacts</b>:<b>Contacts</b>: {
            Object
                .keys(profile.contacts)
                .map((key) => {
                    return <div key={key}>
                        {
                            profile.contacts[key] !== null
                            && <Contact contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                        }

                    </div>
                })}
        </div>
    )
}

const Contact = ({contactTitle, contactValue}: ContactsPropsType) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
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












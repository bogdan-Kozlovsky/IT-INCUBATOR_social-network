import s from './ProfileInfo.module.css'
import {Preloader} from "../../../common/preloader/Preloader";
import {ProfilePropsType} from "../ProfileContainer";
import {ProfileStatus} from "./ProfileStatus";
import usersIcons from "../../../assets/images/users.png";
import {ChangeEvent, useState} from "react";
import {ProfileDataFormReduxForm} from "./ProfileDataForm";
import {useDispatch} from "react-redux";

type propsType = {
    profile: ProfilePropsType | null
    status: string
    updateStatusTC: (status: any) => void
    isOwner: boolean
    savePhotoTC: (file: any) => void
    saveProfileTC: (profile: ProfilePropsType) => Promise<any>
}
export const ProfileInfo = ({profile, status, updateStatusTC, isOwner, savePhotoTC, saveProfileTC}: propsType) => {
    const dispatch = useDispatch()
    let [editMode, setEditMode] = useState<boolean>(false);

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files.length) {
            savePhotoTC(e.currentTarget.files[0])
        }
    }


    const onSubmit = (formData: ProfilePropsType) => {
        saveProfileTC(formData)
            .then(() => {
                    setEditMode(false);
                }
            );
    }
    console.log(editMode)

    return (
        <div>
            <div>
                <img style={{borderRadius: '20px'}} src={profile.photos.large} alt='img'/>
            </div>
            {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
            {editMode
                ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}



            <div className={s.avatar}>
                <img style={{borderRadius: '20px'}} src={profile?.photos.small || usersIcons}
                     alt='avatar'/>
                <ProfileStatus status={status} updateStatusTC={updateStatusTC}/>
            </div>

        </div>
    )
}


type ProfileDataPropsType = {
    profile: ProfilePropsType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {
    return (
        <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>edit</button>
            </div>}
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
                    return <Contact key={key} contactTitle={key}
                                    contactValue={profile.contacts[key as keyof ContactsType]}/>
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












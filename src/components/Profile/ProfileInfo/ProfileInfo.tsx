import s from './ProfileInfo.module.css'
import {Preloader} from "../../../common/preloader/Preloader";
import {ProfilePropsType} from "../ProfileContainer";
import {ProfileStatus} from "./ProfileStatus";
import usersIcons from "../../../assets/images/users.png";
import {ChangeEvent, useState} from "react";
import {ProfileType, savePhotoTC} from "../../../redux/profile-reducer";
import {ProfileDataForm} from "./ProfileDataForm";

type propsType = {
    profile: ProfilePropsType | null
    status: string
    updateStatusTC: (status: any) => void
    isOwner: boolean
    savePhotoTC: (file: any) => void
}
export const ProfileInfo = ({...props}: propsType) => {
    let [editMode, setEditMode] = useState(false);

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files.length) {
            props.savePhotoTC(e.currentTarget.files[0])
        }
    }

    // const onSubmit = (formData: ProfileType) => {
    //     saveProfile(formData).then(
    //         () => {
    //             setEditMode(false);
    //         }
    //     );
    // }


    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img style={{borderRadius: '20px'}} src={props.profile.photos.large} alt='img'/>
            </div>

            {editMode
                ? <ProfileDataForm/>
                // ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => setEditMode(true)}/>}
            {/*    : <ProfileData goToEditMode={() => {*/}
            {/*    setEditMode(true)*/}
            {/*}} profile={profile} isOwner={isOwner}/>}*/}


            {props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
            <div className={s.avatar}>
                <img style={{borderRadius: '20px'}} src={props.profile.photos.small || usersIcons}
                     alt='avatar'/>
                <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => setEditMode(true)}/>
                <ProfileStatus
                    status={props.status}
                    updateStatusTC={props.updateStatusTC}/>
            </div>

        </div>
    )
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact = ({contactTitle, contactValue}: ContactsPropsType) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
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

            <p>{profile.aboutMe}</p>
            <div><b>Full name:</b>{profile.fullName}</div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'not'}
            </div>

            {profile.lookingForAJob &&
                <div><b>My professional skills</b>:{profile.lookingForAJob}</div>
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
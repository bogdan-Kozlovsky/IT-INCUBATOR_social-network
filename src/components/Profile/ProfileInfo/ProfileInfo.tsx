import s from './ProfileInfo.module.css'
import {Preloader} from "../../../common/preloader/Preloader";
import {ProfilePropsType} from "../ProfileContainer";
import {ProfileStatus} from "./ProfileStatus";
import usersIcons from "../../../assets/images/users.png";
import {ChangeEvent} from "react";
import {savePhotoTC} from "../../../redux/profile-reducer";

type propsType = {
    profile: ProfilePropsType | null
    status: string
    updateStatusTC: (status: any) => void
    isOwner: boolean
    savePhotoTC: (file:any) => void
}
export const ProfileInfo = ({...props}: propsType) => {

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files.length) {
            props.savePhotoTC(e.currentTarget.files[0])
        }
    }
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img style={{borderRadius: '20px'}} src={props.profile.photos.large} alt='img'/>
            </div>
            <div className={s.avatar}>
                <img style={{borderRadius: '20px'}} src={props.profile.photos.small || usersIcons}
                     alt='avatar'/>
                <p>{props.profile.aboutMe}</p>
                {props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
                <ProfileStatus
                    status={props.status}
                    updateStatusTC={props.updateStatusTC}/>
            </div>

        </div>
    )
}
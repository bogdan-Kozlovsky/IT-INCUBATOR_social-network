import s from './ProfileInfo.module.css'
import {Preloader} from "../../../preloader/Preloader";
import {ProfilePropsType} from "../ProfileContainer";
import {ProfileStatus} from "./ProfileStatus";


type propsType = {
    profile: ProfilePropsType | null
}
export const ProfileInfo = ({...props}: propsType) => {

    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img style={{borderRadius: '20px'}} src={props.profile.photos.large} alt='img'/>
            </div>
            <div className={s.avatar}>
                <img style={{borderRadius: '20px'}} src={props.profile.photos.small}
                     alt='avatar'/>
                <p>{props.profile.aboutMe}</p>
                <ProfileStatus/>
            </div>

        </div>
    )
}
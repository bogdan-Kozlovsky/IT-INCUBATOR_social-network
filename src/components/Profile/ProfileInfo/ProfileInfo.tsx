import s from './ProfileInfo.module.css'
import {Preloader} from "../../../preloader/Preloader";
import {PhotosPropsType, ProfilePropsType} from "../ProfileContainer";


type propsType = {
    profile: ProfilePropsType
}
export const ProfileInfo = ({...props}: propsType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    console.log(props.profile)
    return (
        <div>
            <div>
                <img style={{borderRadius: '20px'}} src={props.profile.photos.large} alt='img'/>
            </div>
            <div className={s.avatar}>
                <img src="https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
                     alt='avatar'/>
                descrip
            </div>

        </div>
    )
}
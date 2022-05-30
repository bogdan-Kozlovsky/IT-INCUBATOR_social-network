import { ProfileType } from '../../redux/reducer/profile-reducer';

export type ProfileInfoPropsType = {
  profile: ProfileType | null
  status: string
  userId: string | undefined
}
import { ProfileType } from '../../redux/reducer/profile/types';

export type ProfileInfoPropsType = {
  profile: ProfileType | null
  status: string
  userId: string | undefined
}
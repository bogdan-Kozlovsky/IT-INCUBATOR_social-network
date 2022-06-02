import { UserType } from '../../../redux/reducer/user/types';

export type UserPropsType = {
  user: UserType
  followingInProgress: number[]
}
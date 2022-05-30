import { UserType } from '../../../redux/reducer/users-reducer';

export type UserPropsType = {
  user: UserType
  followingInProgress: number[]
}
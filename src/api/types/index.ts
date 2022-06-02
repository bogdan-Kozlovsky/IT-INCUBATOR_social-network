import { UserType } from '../../redux/reducer/user/types';

export type GetUserType = {
  error: null
  items: UserType[]
  totalCount: number
}

export  type AuthMeResponseType = {
  id: string | undefined
  email: string
  login: string
}

export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  data: D
}
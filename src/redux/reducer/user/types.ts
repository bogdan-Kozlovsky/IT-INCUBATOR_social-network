export type UserType = {
  id: number
  photos: {
    large: null | string
    small: null | string
  }
  followed: boolean
  name: string
  status: string
}

export type UsersType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: number[]
}
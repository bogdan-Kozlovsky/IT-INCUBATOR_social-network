export type ContactsPropsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}
export type PhotosPropsType = { large: string, small: string }

export type ProfileType = {
  aboutMe: string
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsPropsType
  photos: PhotosPropsType
}

export type RouteType = {
  likesCount: number
  message: string
  id: string
}
export type InitialType = {
  posts: Array<RouteType>
  profile: ProfileType | null
  status: string
}
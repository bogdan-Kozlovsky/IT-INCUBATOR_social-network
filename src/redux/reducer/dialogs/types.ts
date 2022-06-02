export type InitialStateType = {
  dialogs: Array<PostsType>
  messages: Array<DialogType>
}

export type DialogType = {
  message: string
  id: number
}
export type PostsType = {
  name: string
  id: number
}
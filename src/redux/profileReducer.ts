import {GenericType, PostsType, ProfilePageType} from "./state";


export const profileReducer = (state: ProfilePageType, action: GenericType) => {
    switch (action.type) {
        case'ADD-POST': {
            let newPost: PostsType = {
                name: state.newPostText,
                ava: 'https://assets-global.website-files.com/6005fac27a49a9cd477afb63/60576840e7d265198541a372_bavassano_homepage_gp.jpg\n'
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return {...state}
        }
        case "UPDATE-NEW-POST-TEXT": {
            state.newPostText = action.newPostText
            return {...state}
        }
        default:
            return state
    }
}
import {GenericType, PostsType, ProfilePageType} from "./state";

export type AddPostActionType = {
    type: 'ADD-POST'
}
export const addPostAC = (): AddPostActionType => {
    return {
        type: 'ADD-POST'
    }
}

export type UpdateNewPostActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newPostText: string
}

export const updateNewPostAC = (newPostText: string): UpdateNewPostActionType => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newPostText: newPostText
    }
}

let initialState:ProfilePageType = {
    posts: [
        {
            name: 'Bogdan Kozlovsky',
            ava: 'https://assets-global.website-files.com/6005fac27a49a9cd477afb63/60576840e7d265198541a372_bavassano_homepage_gp.jpg\n'
        },
        {
            name: 'Vasil Kozlovsky',
            ava: 'https://static.remove.bg/remove-bg-web/df171cdac51358b11159b8b90a70ad08d77ad675/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg\n'
        },
        {
            name: 'Vlad ',
            ava: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnPEMT1O67rK1vm-LfTOAU28Xkwdb2Vx4Ekw&usqp=CAU\n'
        },
        {
            name: 'Max',
            ava: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500\n'
        },
    ],
    newPostText: ''
}
export const profileReducer = (state = initialState, action: GenericType) => {
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
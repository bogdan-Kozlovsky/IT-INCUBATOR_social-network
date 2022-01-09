// import {rerenderEntireTree} from "../index";
let rerenderEntireTree = (state: RootStateType) => {
    console.log(state)
}
export type PostsType = {
    name: string
    ava: string
}

export type DialogType = {
    pathDialog: string
    name: string
    id: number
}

export type MessageType = {
    id: number
    description: string
}


export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}

export type DialogsPageType = {
    dialog: Array<DialogType>
    message: Array<MessageType>
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}


export let state: RootStateType = {
    profilePage: {
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
    },
    dialogsPage: {
        dialog: [
            {pathDialog: '/dialogs/1', name: 'Vasil', id: 1},
            {pathDialog: '/dialogs/2', name: 'Vlad', id: 2},
            {pathDialog: '/dialogs/3', name: 'Max', id: 3},
            {pathDialog: '/dialogs/4', name: 'Bogdan', id: 4},
        ],
        message: [
            {id: 1, description: 'Hi how are you doing'},
            {id: 2, description: 'I heard that you have problems'},
            {id: 3, description: 'how is your health today'},
            {id: 4, description: 'Where had you been?'},
        ]
    }
}


export type addPostPropsType = () => void


export const addPost: addPostPropsType = () => {
    let newPost: PostsType = {
        name: state.profilePage.newPostText,
        ava: 'https://assets-global.website-files.com/6005fac27a49a9cd477afb63/60576840e7d265198541a372_bavassano_homepage_gp.jpg\n'
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}

export type updateNewPostText = (newPostText: string) => void
export const updateNewPostText: updateNewPostText = (newPostText) => {
    console.log(newPostText)
    state.profilePage.newPostText = newPostText
    rerenderEntireTree(state)
    console.log(state)
}

export const subscribe = (observer:any) => {
    rerenderEntireTree = observer
}
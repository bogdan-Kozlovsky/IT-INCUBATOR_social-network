import {profileReducer} from "./profile-reducer";
import {dialogsReducer, GlobalReducerType} from "./dialogs-reducer";
import {navbarReducer} from "./navbar-reducer";

type RouteType = {
    likesCount: number
    message: string
    id: number
}
 type DialogType = {
    message: string
    id: number
}
 type PostsType = {
    name: string
    id: number
}
type NavbarRoutesType={
    path:string
    title:string
}
type ProfileType = {
    posts: Array<RouteType>
    newPostText: string,
}
 type DialogsType = {
    dialogs: Array<PostsType>
    messages: Array<DialogType>
    newMessageBody: string
}
type NavBarType = {
    routes:Array<NavbarRoutesType>
}
 type NewPostType = {
    id: number
    message: string
    likesCount: number
}
 type StateType = {
    profilePage: ProfileType
    dialogsPage: DialogsType
    navBarPage: NavBarType

}
 type AddPostActionType = {
    type: 'ADD-POST'
}
 type UpdateNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    text: string
}
 type UpdateNewMessageBodyActionType = {
    type: "UPDATE-NEW-MESSAGE-BODY"
    body: string
}
 type SendMessageActionType = {
    type: "SEND-MESSAGE"
}
 type allCreator =
    AddPostActionType
    | UpdateNewPostTextActionType
    | UpdateNewMessageBodyActionType
    | SendMessageActionType
 type StoreType = {
    _state: StateType
    _callSubscriber: () => void
    subscribe: (observer: (state: StateType) => void) => void
    getState: () => StateType
    dispatch: (action:GlobalReducerType) => void
}

 const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi,how are you', likesCount: 12},
                {id: 2, message: 'Hi, you', likesCount: 11},
                {id: 3, message: 'Hi,how are you', likesCount: 11},
                {id: 4, message: 'how are you', likesCount: 12}
            ],
            newPostText: 'it-kamas',
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Slava'},
                {id: 2, name: 'Borya'},
                {id: 3, name: 'Igor'},
                {id: 4, name: 'Viktor'}],
            messages: [
                {id: 1, message: 'Hi Kaktus'},
                {id: 2, message: 'Hi klaus'},
                {id: 3, message: 'Hi Valeron'},
                {id: 4, message: 'Hi hello'},
                {id: 5, message: 'Hi you'}
            ],

            newMessageBody: "",
        },
        navBarPage: {
            routes: [
                {path: '/', title: 'Profile'},
                {path: '/dialogs', title: 'Message'},
                {path: '/news', title: 'News'},
                {path: '/music', title: 'Music'},
                {path: '/settings', title: 'Settings'},
            ]
        }

    },
    _callSubscriber() {
        console.log('store changes')
    },
    subscribe(observer: any) {
        this._callSubscriber = observer
    },
    getState() {
        return this._state
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.navBarPage = navbarReducer(this._state.navBarPage, action)
        this._callSubscriber()
    },
}




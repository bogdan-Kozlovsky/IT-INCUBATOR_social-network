export type UserType = {
    id: number
    photoUrl:string
    followed: boolean
    fullName: string
    status: string
    location: {
        city: string
        country: string
    }
}
export type UsersType = {
    users: Array<UserType>
}
let initialState: UsersType = {
    users: [
        // {
        //     id: 1,
        //     photoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9aUT1ZCEcuME13723bYJ9xnzn-XQ5zWGcUCnsLdjo2m4MEgOHl5BP1uXbklcmIZfpTx0&usqp=CAU',
        //     followed: true,
        //     fullName: 'Max',
        //     status: 'I am a student',
        //     location: {city: 'Kostroma', country: 'Russia'}
        // },
        // {
        //     id: 2,
        //     photoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeQW7jGROV6Xf1_fDam4b7IYTZliTN6X8Rzw&usqp=CAU',
        //     followed: true,
        //     fullName: 'Bogdan',
        //     status: 'I am a Boss for Maxim',
        //     location: {city: 'Vinnitsa', country: 'Ukraine'}
        // },
        // {
        //     id: 3,
        //     photoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeQW7jGROV6Xf1_fDam4b7IYTZliTN6X8Rzw&usqp=CAU',
        //     followed: false,
        //     fullName: 'Dimich',
        //     status: 'I am a teacher for Bogdan and Max',
        //     location: {city: 'Minsk', country: 'Belarus'}
        // },

    ]
}
export const usersReducer = (state: UsersType = initialState, action: GlobalReducerType): UsersType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: true} : u)}
        case "UNFOLLOW":
            return {...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: false} : u)}
        case "SET-USER":
            return {...state,users:[...state.users,...action.payload.users]}
        default:
            return state
    }
}
type GlobalReducerType = FollowACType
    | UnfollowACType
    | SetUsersACType

type FollowACType = ReturnType<typeof followAC>
export const followAC = (userId: number) => {
    return {
        type: 'FOLLOW',
        payload: {
            userId
        }
    } as const
}
type UnfollowACType = ReturnType<typeof unfollowAC>
export const unfollowAC = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        payload: {
            userId
        }
    } as const
}

type SetUsersACType = ReturnType<typeof setUsersAC>
export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: 'SET-USER',
        payload: {
            users
        }
    } as const
}
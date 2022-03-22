import {usersAPI} from "../api/api";
import {Dispatch} from "redux";

// type
export type UserType = {
    id: number
    photos: { small: string, large: string }
    followed: boolean
    name: string
    status: string
    location: {
        city: string
        country: string
    }
}
export type UsersType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
let initialState: UsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 3,
    isFetching: true,
    followingInProgress: [],
}
type GlobalReducerType =
    | ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersTotalCountAC>
    | ReturnType<typeof toggleIsFetchingAC>
    | ReturnType<typeof toggleIsFollowingProgressAC>

// reducer
export const usersReducer = (state: UsersType = initialState, action: GlobalReducerType): UsersType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: true} : u)}
        case "UNFOLLOW":
            return {...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: false} : u)}
        case "SET-USER":
            return {...state, users: [...action.payload.users]}
        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.payload.currentPage}
        case "SET-USERS-TOTAL-COUNT":
            return {...state, totalUsersCount: action.payload.totalCount}
        case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.payload.isFetching}
        case "TOGGLE-IS-FOLLOWING-PROGRESS":
            return {
                ...state,
                followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter(id => id != action.payload.userId)
            }
        default:
            return state
    }
}

// actionCreator
export const followAC = (userId: number) => {
    return {
        type: 'FOLLOW',
        payload: {userId}
    } as const
}
export const unfollowAC = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        payload: {userId}
    } as const
}
export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: 'SET-USER',
        payload: {users}
    } as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        payload: {currentPage}
    } as const
}
export const setUsersTotalCountAC = (totalCount: number) => {
    return {
        type: 'SET-USERS-TOTAL-COUNT',
        payload: {totalCount}
    } as const
}
export const toggleIsFetchingAC = (isFetching: boolean) => {
    return {
        type: 'TOGGLE-IS-FETCHING',
        payload: {isFetching}
    } as const
}
export const toggleIsFollowingProgressAC = (isFetching: boolean, userId: any) => {
    return {
        type: 'TOGGLE-IS-FOLLOWING-PROGRESS',
        payload: {isFetching, userId}
    } as const
}

// thunk
export const getUsersTC = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        dispatch(setCurrentPageAC(currentPage))
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetchingAC(false))
                dispatch(setUsersAC(data.items))
                dispatch(setUsersTotalCountAC(data.totalCount))
                // this.props.setTotalCount(data.totalCount)
            })
    }
}
export const followTC = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFollowingProgressAC(true, userId))
        usersAPI.followAC(userId)
            .then(response => {
                if (response.data.resultCode) {
                    dispatch(followAC(userId))
                }
                dispatch(toggleIsFollowingProgressAC(false, userId))
            })
    }
}
export const unfollowTC = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFollowingProgressAC(true, userId))
        usersAPI.followAC(userId)
            .then(response => {
                if (response.data.resultCode) {
                    dispatch(unfollowAC(userId))
                }
                dispatch(toggleIsFollowingProgressAC(false, userId))
            })
    }
}
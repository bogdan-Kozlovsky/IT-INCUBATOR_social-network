import {authAPI} from "../api/api";
import {Dispatch} from "redux";

// type
export type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export type GeneralType = ReturnType<typeof setAuthUserDataAC>

// reducer
export const authReducer = (state: InitialStateType = initialState, action: GeneralType): InitialStateType => {
    switch (action.type) {
        case "SET-USER-DATA": {
            return {...state, ...action.data, isAuth: true}
        }
        default: {
            return state
        }
    }
}

// actionCreator
export const setAuthUserDataAC = (id: number, email: string, login: string, isAuth: boolean) => {
    return {
        type: 'SET-USER-DATA',
        data: {
            id, email, login, isAuth
        }
    }
}

// thunk
export const getAuthUserDataThunk = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    dispatch(setAuthUserDataAC(id, email, login, true))
                }
            })
    }
}


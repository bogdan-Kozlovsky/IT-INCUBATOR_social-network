import {getAuthUserDataThunk} from "./auth-reducer";
import {Dispatch} from "redux";

// initial state
export type InitialStateType = {
    initialized: boolean
    error: string | null
}

// type
let initialState = {
    initialized: false,
    error: null,
}
export type GeneralType =
    ReturnType<typeof initializeSuccessAC> |
    ReturnType<typeof errorAC>

// reducer
export const appReducer = (state: InitialStateType = initialState, action: GeneralType): InitialStateType => {
    switch (action.type) {
        case "INITIALIZED-SUCCESS":
            return {...state, initialized: action.value}
        case "APP-ERROR":
            return {...state, error: action.value}
        default:
            return state
    }
}

// action creator
export const initializeSuccessAC = (value: boolean) => {
    return {
        type: 'INITIALIZED-SUCCESS', value
    } as const
}

export const errorAC = (value: any) => {
    return {
        type: 'APP-ERROR', value
    } as const
}
// thunk
export const initializeAppTC = () => async (dispatch: any) => {
    dispatch(getAuthUserDataThunk())
    dispatch(initializeSuccessAC(true))
}
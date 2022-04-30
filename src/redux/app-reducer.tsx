import {getAuthUserDataThunk} from "./auth-reducer";
import {Dispatch} from "redux";

// initial state
export type InitialStateType = {
    initialized: boolean
}

// type
let initialState = {
    initialized: false
}
export type GeneralType = ReturnType<typeof initializeSuccessAC>

// reducer
export const appReducer = (state: InitialStateType = initialState, action: GeneralType): InitialStateType => {
    switch (action.type) {
        case "INITIALIZED-SUCCESS":
            return {...state, initialized: action.value}
        default:
            return state
    }
}

// action creator
export const initializeSuccessAC = (value:boolean) => ({type: 'INITIALIZED-SUCCESS',value} as const)
// thunk
export const initializeAppTC = () => async (dispatch: any) => {
    debugger
    dispatch(getAuthUserDataThunk())
    dispatch(initializeSuccessAC(true))
}
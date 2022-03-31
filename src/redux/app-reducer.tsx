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
            // error initialized: false
            return {...state, initialized: false}
        default:
            return state
    }
}

// action creator
export const initializeSuccessAC = () => ({type: 'INITIALIZED-SUCCESS',} as const)
// thunk
export const initializeAppTC = () => async (dispatch: any) => {
    dispatch(getAuthUserDataThunk())
    const resolve = await dispatch(initializeSuccessAC())
}
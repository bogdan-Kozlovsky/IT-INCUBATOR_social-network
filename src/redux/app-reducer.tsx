import {getAuthUserDataThunk} from "./auth-reducer";
import {Dispatch} from "redux";

export type InitialStateType = {
    initialized: boolean
}

let initialState = {
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: GeneralType): InitialStateType => {
    switch (action.type) {
        case "SET-INITIALIZED": {
            return {
                ...state,
                initialized: true
            }
        }
        default: {
            return state
        }
    }
}
export type GeneralType = SetUserDataType
type SetUserDataType = ReturnType<typeof initializeSuccessAC>
export const initializeSuccessAC = () => {
    return {
        type: 'INITIALIZED-SUCCESS',

    }
}
export const initializeAppTC = () => (dispatch: any) => {
    debugger
    dispatch(getAuthUserDataThunk())
        .then(() => {
            dispatch(initializeSuccessAC())
        })
}
import {authAPI, securityAPI} from "../api/api";
import {Dispatch} from "redux";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {errorAC, initializeSuccessAC} from "./app-reducer";
import {ErrorFunc} from "../common/hook/selectorHook";

// type
export type InitialStateType = {
    // id: number | null
    id: string | undefined
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
let initialState = {
    id: undefined,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}
export type GeneralType =
    | ReturnType<typeof setAuthUserDataAC>
    | ReturnType<typeof getCaptchaUrlSuccessAC>

// reducer
export const authReducer = (state: InitialStateType = initialState, action: GeneralType): InitialStateType => {
    switch (action.type) {
        case "SET-USER-DATA":
            return {...state, ...action.payload, isAuth: action.payload.isAuth}
        case "GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

// actionCreator
export const setAuthUserDataAC = (id: string | undefined, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: 'SET-USER-DATA',
        payload: {
            id, email, login, isAuth
        }
    } as const
}

export const getCaptchaUrlSuccessAC = (captchaUrl: string) => {
    return {
        type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    } as const
}

// thunk
export const getAuthUserDataThunk = () => async (dispatch: Dispatch) => {
    try {
        const response = await authAPI.me()

        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data

            dispatch(setAuthUserDataAC(id, email, login, true))
            dispatch(initializeSuccessAC(true))
        }
        if (response.data.resultCode === 1) {
            ErrorFunc(response.data.messages[0], dispatch)
        }
    } catch (error) {
        if (error instanceof Error) {
            const {name} = error
            ErrorFunc(name, dispatch)
        }
    }
}

type ThunkType = ThunkAction<void, AppStateType, Dispatch<GeneralType>, GeneralType>

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: ThunkDispatch<AppStateType, unknown, FormAction>) => {
    try {
        const response = await authAPI.login(email, password, rememberMe, captcha);
        if (response.data.resultCode === 0) {
            await dispatch(getAuthUserDataThunk());
        } else {
            if (response.data.resultCode === 10) {
                await dispatch(getCaptchaUrlTC());
            } else {
                const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                dispatch(stopSubmit("login", {_error: message}));
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            const {name} = error
            ErrorFunc(name, dispatch)
        }
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    try {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserDataAC(undefined, null, null, false));
            dispatch(initializeSuccessAC(false))
        }
    } catch (error) {
        if (error instanceof Error) {
            const {name} = error
            ErrorFunc(name, dispatch)
        }
    }
}

export const getCaptchaUrlTC = () => async (dispatch: Dispatch) => {
    try {
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccessAC(captchaUrl));
    } catch (error) {
        if (error instanceof Error) {
            const {name} = error
            ErrorFunc(name, dispatch)
        }
    }


}

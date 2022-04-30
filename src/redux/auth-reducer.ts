import {authAPI, securityAPI} from "../api/api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

// type
export type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
let initialState = {
    id: null,
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
            // return {...state, ...action.data, isAuth: action.data.isAuth}
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
export const setAuthUserDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
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
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
}

type ThunkType = ThunkAction<void, AppStateType, Dispatch<GeneralType>, GeneralType>

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => (dispatch) => {
    authAPI.login(email, password, rememberMe, captcha)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDataThunk() as any)
            } else {
                if (response.data.resultCode === 10) {
                    dispatch(getCaptchaUrlTC())
                }
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                // @ts-ignore
                dispatch(stopSubmit("login", {_error: message}));

            }
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(null, null, null, false));
            }
        });
}

export const getCaptchaUrlTC = () => async (dispatch: Dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccessAC(captchaUrl));
}

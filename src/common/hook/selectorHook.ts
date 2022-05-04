import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {errorAC} from "../../redux/app-reducer";
import {Dispatch} from "redux";

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

export const ErrorFunc = (error: any, dispatch: Dispatch) => {
    if (error) {
        dispatch(errorAC(error))
        setTimeout(() => {
            dispatch(errorAC(null))
        }, 2000)
    }
}
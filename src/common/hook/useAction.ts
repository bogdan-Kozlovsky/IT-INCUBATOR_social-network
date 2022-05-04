import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
// import ActionCreators from './actionCreator'
import {errorAC} from "../../redux/app-reducer";

export const useActions = () => {
    const dispatch = useDispatch()
    // return bindActionCreators(ActionCreators, dispatch)
}

export const ErrorFunc = (error: any) => {
    const dispatch = useDispatch()
    if (error instanceof Error) {
        dispatch(errorAC(error.name))
        setTimeout(() => {
            dispatch(errorAC(null))
        }, 2000)
    }
}


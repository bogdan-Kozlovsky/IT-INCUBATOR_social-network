import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../../common/FromControls/FormControls";
import {required} from "../../utils/validators";
import {connect, useDispatch} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Navigate} from "react-router-dom";
import {FC} from "react";

// type
type FormDataType = {
    login: string,
    password: string,
    rememberMe: boolean,
    captchaUrl: any
}
type MapStateToPropsType = {
    isAuth: boolean
}
type MapDispatchToPropsType = {}
type LoginFormOwnProps = {
    captchaUrl: string | null
}

export type LoginFormValuesType = {
    login: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}
// export const LoginForm = (props: InjectedFormProps<FormDataType>) => {
export const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({
                                                                                                                 handleSubmit,
                                                                                                                 error,
                                                                                                                 captchaUrl
                                                                                                             }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Login'}
                       name={'login'}
                       validate={[required]}
                       component={Input}
                />
            </div>
            <div>
                <Field
                    validate={[required]}
                    placeholder={'Password'}
                    name={'password'}
                    type={'password'}
                    component={Input}
                />
            </div>
            <div>
                <Field
                    type={'checkbox'}
                    name={'rememberMe'}
                    component={Input}
                /> remember me
            </div>

            {captchaUrl && <img src={captchaUrl} alt={'captchaUrl'}/>}
            {captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, {})}
            {error && <div style={{color: 'red'}}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>

    );
};


// const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

// type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>
type LoginFormValuesTypeKeys = any

// export type LoginFormValuesType = {
//     captcha: string
//     rememberMe: boolean
//     password: string
//     email: string
// }
type LoginPropsType = {
    isAuth?: boolean
    captchaUrl?: any
    loginTC?: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
const Login = (props: LoginPropsType) => {
    const dispatch = useDispatch()
    const onSubmit = (formData: LoginFormValuesType) => {
        console.log(formData)
        dispatch(loginTC(formData.login, formData.password, formData.rememberMe, formData.captcha))
    }

    if (props.isAuth) {
        return <Navigate to={"/"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
};
const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {loginTC})(Login);
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../../common/FromControls/FormControls";
import {required} from "../../utils/validators";
import {useDispatch} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {FC} from "react";
import {useAppSelector} from "../../common/hook/selectorHook";
import {selectIsAuth} from "../../redux/selectors";

// type
type LoginFormOwnProps = {
    captchaUrl: string | null
}

export type LoginFormValuesType = {
    login: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}
export const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props: any) => {

    const {
        error,
        captchaUrl
    } = props

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<LoginFormValuesTypeKeys>('Login', 'login', [required], Input)}
            </div>
            <div>
                {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {type: 'password'})}
            </div>
            <div>
                {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
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


const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>


export const Login = () => {
    const {isAuth, captchaUrl} = useAppSelector(selectIsAuth)
    const dispatch = useDispatch()
    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(loginTC(formData.login, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to={"/"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    );
};
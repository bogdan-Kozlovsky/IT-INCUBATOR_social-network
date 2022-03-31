import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/FromControls/FormControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Navigate} from "react-router-dom";

// type
type FormDataType = {
    login: string,
    password: string,
    rememberMe: boolean,
}
type MapStateToPropsType = {
    isAuth: boolean
}
type MapDispatchToPropsType = {}

export const LoginForm = (props: InjectedFormProps<FormDataType>) => {

    const {
        handleSubmit,
        error,
    } = props

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


const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = (props: any) => {

    const onSubmit = (formData: FormDataType) => {
        props.loginTC(formData.login, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};
const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {loginTC})(Login);
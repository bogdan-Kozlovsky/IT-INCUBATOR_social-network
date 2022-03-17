import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/FromControls/FormControls";
import {required} from "../../utils/validators";

type FormDataType = {
    login: string,
    password: string,
    rememberMe: boolean,
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
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
            <div>
                <button>Login</button>
            </div>
        </form>

    );
};


const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

export const Login = () => {

    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};
import React, { FC } from 'react';

import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { createField, GetStringKeys, Input } from '../../common/FromControls/FormControls';
import { useAppSelector } from '../../common/hook/selectorHook';
import { PATH } from '../../enums/patch';
import { loginTC } from '../../redux/reducer/auth-reducer';
import { selectIsAuth } from '../../redux/reducer/selectors';
import { required } from '../../utils/validators';

import s from './style.module.css';

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
    captchaUrl,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* {createField<LoginFormValuesTypeKeys>('Login', 'login', [required], Input)} */}
        <Field
          validate={[required]}
          component={Input}
          className={s.input}
          name='login'
          placeholder='Login'
        />
      </div>
      <div>
        <Field
          validate={[required]}
          component={Input}
          className={s.input}
          name='password'
          placeholder='Password'
          type='password'
        />
      </div>

      <label className={s.label}>
        remember me
        <Field
          component={Input}
          className={s.inputCheckbox}
          name='rememberMe'
          type='checkbox'
        />
      </label>

      {captchaUrl && <img src={captchaUrl} alt='captchaUrl' />}
      {captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, {})}
      {error && <div style={{ color: 'red' }}>
        {error}
      </div>
      }
      <div>
        <button className='btn' type='submit'>Login</button>
      </div>
    </form>

  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm);

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const Login = () => {
  const { isAuth, captchaUrl } = useAppSelector(selectIsAuth);
  const dispatch = useDispatch();
  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(loginTC(formData.login, formData.password, formData.rememberMe, formData.captcha));
  };

  if (isAuth) {
    return <Navigate to={PATH.ME} />;
  }

  return (
    <div className={s.loginWrapper}>
      <div className={s.box}>
        <h3 className={s.subTitle}>To log in get registered <a className={s.link}
                                                               href='https://social-network.samuraijs.com/login'>here</a> or
          use common test account credentials:</h3>
        <p className={s.text}>
          Email:
          {/* <span className={s.decor}>  free@samuraijs.com</span> */}
          <span className={s.decor}>  bogdankozlovski18@gmail.com</span>
        </p>
        <p className={s.text}>
          Password:
          <span className={s.decor}> bogdan04.06</span>
        </p>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
      </div>

    </div>
  );
};
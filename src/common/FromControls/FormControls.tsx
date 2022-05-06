import { FC } from 'react';

import { Field, WrappedFieldProps } from 'redux-form';

import styles from './FormControls.module.css';

export type FieldValidatorType = (value: string) => string | undefined

export const FormControl = ({ input, meta, child, ...props }: any) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
      <div>
        {props.children}
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Textarea = (props: any) => {
  const { input, meta, child, ...restProps } = props;
  return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>;
};

// @ts-ignore
export const Input = (props) => {
  const { input, meta, child, ...restProps } = props;
  return <FormControl {...props}><input {...input} {...restProps} /></FormControl>;
};

export function createField<FormKeysType extends string>(placeholder: string | undefined,
                                                         name: FormKeysType,
                                                         validators: Array<FieldValidatorType>,
                                                         component: FC<WrappedFieldProps>,
                                                         props = {}, text = '') {
  return <div>
    <Field placeholder={placeholder} name={name}
           validate={validators}
           component={component}
           {...props}
    /> {text}
  </div>;
}

export type GetStringKeys<T> = Extract<keyof T, string>
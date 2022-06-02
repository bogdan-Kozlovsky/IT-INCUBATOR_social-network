import React from 'react';

import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { AddMessageFormType } from '../Dialogs/types';

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field
      component='textarea'
      name='newMessageBody'
      className='textArea'
      placeholder='Enter your message'
    />
    <div>
      <button type='submit' className='btn'>Add message</button>
    </div>
  </form>
);
export const AddMessageFormRedux = reduxForm<AddMessageFormType>({ form: 'dialogAddMessageForm' })(AddMessageForm);
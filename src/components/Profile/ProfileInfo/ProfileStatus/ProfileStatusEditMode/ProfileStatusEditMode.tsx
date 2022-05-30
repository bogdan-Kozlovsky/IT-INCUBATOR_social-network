import { ChangeEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

import pencil from '../../../../../assets/images/pencil.svg';
import { updateStatusTC } from '../../../../../redux/reducer/profile-reducer';
import s from '../../ProfileInfo.module.css';

import { ProfileStatusEditModePropsType } from './types';

export const ProfileStatusEditMode = (props: ProfileStatusEditModePropsType) => {

  const { status } = props;

  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(status);

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onDeactivateEditModeBlur = () => {
    dispatch(updateStatusTC(value));
    setIsEditMode(false);
  };

  const onActiveEditModeClick = () => {
    setIsEditMode(true);
  };

  return (
    <div>
      {isEditMode
        ? <input
          className={s.statusInput}
          onChange={onStatusChange}
          onBlur={onDeactivateEditModeBlur}
          autoFocus
          type='text'
          placeholder='change profile status'
          value={value}
        />

        : <div onDoubleClick={onActiveEditModeClick} className={s.statusBox}>
          <b>status:</b>
          <span>{status || 'изменить статус профиля'}</span>
          <img className={s.pencilDecor} src={pencil} alt='pencil' />
        </div>
      }
    </div>
  );
};
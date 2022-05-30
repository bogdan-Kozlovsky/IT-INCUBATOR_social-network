import { ChangeEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

import { selectIdAuth } from '../../../redux/selectors/auth';
import { selectPhotoLarge } from '../../../redux/selectors/profile';
import { ProfileData } from '../ProfileData/ProfileData';
import { ProfileInfoPropsType } from '../types';

import s from './ProfileInfo.module.css';

import usersIcons from 'assets/images/users.png';
import { Preloader } from 'common/preloader/Preloader';
import { ProfileDataFormReduxForm } from 'components/Profile/ProfileInfo/ProfileDataForm';
import { ProfileStatus } from 'components/Profile/ProfileInfo/ProfileStatus/ProfileStatus';
import { ProfileType, savePhotoTC, saveProfileTC } from 'redux/reducer/profile-reducer';
import { useAppSelector } from 'types/useAppSelector';

export const ProfileInfo = ({ profile, status, userId }: ProfileInfoPropsType) => {

  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const photo = useAppSelector(selectPhotoLarge);
  const id = useAppSelector(selectIdAuth);

  const onPhotoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length) {
      dispatch(savePhotoTC(e.currentTarget.files[0]));
    }
  };

  const onSubmit = (formData: ProfileType) => {
    dispatch(saveProfileTC(formData));
    setIsEditMode(false);
  };

  const onChangeIsEditModeClick = () => {
    setIsEditMode(!isEditMode);
  };

  if (!profile) {
    return <Preloader />;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.changeAvatarBox}>
        <img className={s.images} src={photo || usersIcons} alt='img' />

        {id === userId &&
          <label className={s.label}>
            change avatar
            <input className={s.inputFile} type='file' onChange={onPhotoFileChange} />
          </label>
        }

      </div>

      <div className={s.dataChangesBox}>
        <h2 className={s.title}>User information:</h2>

        <ProfileStatus status={status} myId={id} userId={userId} />

        {isEditMode
          ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
          : <ProfileData profile={profile} goToEditMode={() => setIsEditMode(true)} />
        }

        {id === userId &&
          <button className={s.edit} onClick={onChangeIsEditModeClick}>Edit information ✎</button>
        }

      </div>
    </div>
  );
};

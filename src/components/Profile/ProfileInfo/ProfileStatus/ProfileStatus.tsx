import { ProfileStatusEditMode } from './ProfileStatusEditMode/ProfileStatusEditMode';
import { ProfileStatusPropsType } from './types';

export const ProfileStatus = (props: ProfileStatusPropsType) => {

  const { status, userId, myId } = props;

  return (
    <div>
      {userId === myId
        ? <ProfileStatusEditMode status={status} />
        : <span>{status || 'not status'}</span>
      }
    </div>
  );
};


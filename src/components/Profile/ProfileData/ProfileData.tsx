import { Contact } from '../Contact/Contact';
import { ContactsType } from '../Contact/types';
import s from '../ProfileInfo/ProfileInfo.module.css';

export const ProfileData = ({ profile }: any) => {

  const { aboutMe, fullName, lookingForAJob, contacts } = profile;

  return (
    <table>
      <tbody className={s.tbody}>
      <tr>
        <td>Full name:</td>
        <td>{fullName}</td>
      </tr>
      <tr>
        <td>About me:</td>
        <td>{aboutMe}</td>
      </tr>
      <tr>
        <td>Looking for a job:</td>
        <td>{lookingForAJob ? 'yes' : 'not'}</td>
      </tr>

      {profile.lookingForAJob &&
        <div>
          <b>My professional skills</b>:{profile.lookingForAJob}
        </div>
      }

      <b>Contacts</b>: {
        Object
          .keys(contacts)
          .map((key) => <div key={key}>
            {
              contacts[key] !== null
              &&
              <Contact contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
            }

          </div>)}
      </tbody>

    </table>
  );
};
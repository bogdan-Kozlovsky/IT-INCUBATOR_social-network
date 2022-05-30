import { ContactsPropsType } from './types';

export const Contact = ({ contactTitle, contactValue }: ContactsPropsType) => <table>
  <tbody>
  <tr>
    <td>{contactTitle}:</td>
    <td>{contactValue}</td>
  </tr>
  </tbody>

</table>;
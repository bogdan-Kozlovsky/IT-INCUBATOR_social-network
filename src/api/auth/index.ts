import { instance } from 'api/config';
import { AuthMeResponseType, ResponseType } from 'api/type';

export const authApi = {
  me() {
    // return instance.get<ResponseType<{ data: AuthMeResponseType }>>('auth/me')
    return instance.get('auth/me');
  },
  login(email: string, password: string, rememberMe: boolean, captcha: string) {
    return instance.post<ResponseType<{ data: AuthMeResponseType }>>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logout() {
    return instance.delete<ResponseType>(`/auth/login`);
  },
};
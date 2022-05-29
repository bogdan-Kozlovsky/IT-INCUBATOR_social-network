import { instance } from 'api/config';
import { AuthMeResponseType, ResponseType } from 'api/types';

export const authApi = {
  me() {
    return instance.get<ResponseType<AuthMeResponseType>>('auth/me');
  },

  login(email: string, password: string, rememberMe: boolean, captcha: string) {
    return instance.post<ResponseType<AuthMeResponseType>>(`auth/login`, {
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
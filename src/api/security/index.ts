import { instance } from 'api/config';

export const securityApi = {
  getCaptchaUrl() {
    return instance.get<{ url: string }>(`security/get-captcha-url`);
  },
};
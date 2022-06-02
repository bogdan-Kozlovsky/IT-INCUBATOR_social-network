export const setAuthUserDataAC = (id: string | undefined, email: string | null, login: string | null, isAuth: boolean) => ({
  type: 'SET-USER-DATA',
  payload: {
    id, email, login, isAuth,
  },
} as const);

export const getCaptchaUrlSuccessAC = (captchaUrl: string) => ({
  type: 'GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl },
} as const);
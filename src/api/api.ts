import axios from "axios";
import {UserType} from "../redux/users-reducer";
import {PhotosPropsType, ProfileType} from "../redux/profile-reducer";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.000/',
    withCredentials: true,
    headers: {
        'API-KEY': "edbb6621-0047-4274-8a4c-f1d2a1bf4727    "
    },
})


type getUserType = {
    error: null
    items: UserType[]
    totalCount: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type AuthMeResponseType = {
    id: string | undefined
    email: string
    login: string
}
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<getUserType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
    },
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>('profile/status', {status})
    },
    savePhoto(photoFile: string) {
        let formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<ResponseType<{ photos: PhotosPropsType }>>('/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile);
    }
}
export const authAPI = {
    me() {
        return instance.get<{ data: AuthMeResponseType }>('auth/me')
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<ResponseType<{ data: AuthMeResponseType }>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
    },
    logout() {
        return instance.delete<ResponseType>(`/auth/login`)
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{ url: string }>(`security/get-captcha-url`);
    }
}

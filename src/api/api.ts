import axios from "axios";
import {ProfilePropsType} from "../components/Profile/ProfileContainer";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': "edbb6621-0047-4274-8a4c-f1d2a1bf4727    "
    },
})


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    unfollowAC(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    followAC(userId: number) {
        return instance.post(`follow/${userId}`)
    },


}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status})
    },
    savePhoto(photoFile: string) {
        debugger
        let formData = new FormData()
        formData.append('image', photoFile)
        return instance.put('/profile/photo', formData, {

            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfilePropsType) {
        debugger
        return instance.put(`profile`, profile);
    }
}
export const authAPI = {
    me() {
        return instance.get('auth/me')
    },
    login(email: string, password: string, rememberMe: Boolean) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`/auth/login`)
    },

}

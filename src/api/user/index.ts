import { instance } from 'api/config';
import { GetUserType, ResponseType } from 'api/types';

export const usersAPI = {

  getUsers(currentPage: number, pageSize: number) {
    return instance.get<GetUserType>(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data);
  },

  unfollow(userId: number) {
    return instance.delete<ResponseType>(`follow/${userId}`);
  },

  follow(userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`);
  },
};
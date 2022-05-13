import { instance } from 'api/config';
import { getUserType, ResponseType } from 'api/type';

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance.get<getUserType>(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data);
  },
  unfollow(userId: number) {
    return instance.delete<ResponseType>(`follow/${userId}`);
  },
  follow(userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`);
  },
};
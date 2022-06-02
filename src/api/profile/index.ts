import { PhotosPropsType, ProfileType } from '../../redux/reducer/profile/types';

import { instance } from 'api/config';
import { ResponseType } from 'api/types';

export const profileApi = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${userId}`);
  },

  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },

  updateStatusProfile(status: string) {
    return instance.put<ResponseType>('profile/status', { status });
  },

  savePhotoProfile(photoFile: string) {
    const formData = new FormData();

    formData.append('image', photoFile);

    return instance.put<ResponseType<{ photos: PhotosPropsType }>>('/profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  saveProfile(profile: ProfileType) {
    return instance.put<ResponseType>(`profile`, profile);
  },
};
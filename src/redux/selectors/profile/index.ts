import { ProfileType, RouteType } from '../../reducer/profile/types';
import { AppStateType } from '../../store';

export const selectProfile = (state: AppStateType): ProfileType | null => state.profilePage.profile;
export const selectPhotoLarge = (state: AppStateType) => state.profilePage.profile?.photos.large;
export const selectPost = (state: AppStateType): RouteType[] => state.profilePage.posts;
export const selectStatus = (state: AppStateType): string => state.profilePage.status;
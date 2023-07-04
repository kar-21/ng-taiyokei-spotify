import { TokenModal } from 'src/app/model/login.model';
import { ProfileModel } from 'src/app/model/profile.model';

export interface IUserProfile {
  token: TokenModal;
  profile: ProfileModel;
}

export const initialUserProfileState: IUserProfile = {
  token: {
    access_token: '',
    token_type: '',
    scope: '',
    expires_in: 0,
    refresh_token: '',
  },
  profile: {
    country: '',
    display_name: '',
    email: '',
    explicit_content: { filter_enabled: false, filter_locked: false },
    external_urls: {
      spotify: '',
    },
    followers: { href: '', total: 0 },
    href: '',
    id: '',
    images: [] as never[],
    product: '',
    type: '',
    uri: '',
  },
};

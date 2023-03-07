import { ProfileModel } from 'src/app/model/profile.model';

export const initialUserProfileState = {
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
};

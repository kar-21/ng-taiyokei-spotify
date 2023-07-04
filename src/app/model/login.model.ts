export interface LoginModel {
  url: string;
}

export interface RefreshModal {
  refresh_token: string;
}

export interface TokenModal {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

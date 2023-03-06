export interface AvailableGenreModel {
  genres: string[];
}

export interface UIGenreModel {
  name: string;
  color: string;
}

export interface CategoriesApiModel {
  categories: {
    href: string;
    items: Categories[];
    limit: number;
    next: string;
    offset: number;
    previous: number;
    total: number;
  };
}

export interface Categories {
  href: string;
  icons: CategoryIcon[];
  id: string;
  name: string;
}

export interface CategoryIcon {
  height: number;
  width: number;
  url: string;
}

export interface FeaturedPlaylistsApiModel {
  message: string;
  playlists: {
    href: string;
    items: Playlists[];
    limit: number;
    next: string;
    offset: number;
    previous: number;
    total: number;
  };
}

export interface Playlists {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: PlaylistImage[];
  name: string;
  owner: {
    display_name: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: string;
  snapshot_id: string;
  tracks: { href: string; total: number };
  type: string;
  uri: string;
}

export interface PlaylistImage {
  height: number;
  width: number;
  url: string;
}

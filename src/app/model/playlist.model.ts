import { PlaylistImage } from './browse.model';

export interface PlaylistApi {
  href: string;
  items: PlaylistItems[];
  limit: number;
  next: number;
  previous: number;
  offset: number;
  total: number;
}

export interface PlaylistItems {
  added_at: string;
  added_by: {
    external_urls: ExternalURLType;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color: string;
  track: Track;
  video_thumbnail: { url: string };
}

export interface Track {
  album: AlbumModel;
  artists: ArtistModel[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: ExternalURLType;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: 71;
  preview_url: string;
  track: true;
  track_number: number;
  type: string;
  uri: string;
}

export interface AlbumModel {
  album_type: string;
  artists: ArtistModel[];
  available_markets: string[];
  external_urls: ExternalURLType;
  href: string;
  id: string;
  images: PlaylistImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface ExternalURLType {
  spotify: string;
}

export interface ArtistModel {
  external_urls: ExternalURLType;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

import { PlaylistItems } from 'src/app/model/playlist.model';

export interface TracksRequestModel {
  playlistId: string;
  previous: number;
}

export interface TracksResponseModel {
  tracks: PlaylistItems[];
  total: number;
  previous: number;
}

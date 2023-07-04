import { Playlists } from 'src/app/model/browse.model';

export interface IPlaylistsState {
    playlists: Playlists[];
    total: number;
    previous: number
}

export const initialPlaylistsState = {
  playlists: [] as Playlists[],
  total: 0,
  previous: 0,
};

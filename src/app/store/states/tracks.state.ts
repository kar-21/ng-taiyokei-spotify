import { PlaylistItems } from "src/app/model/playlist.model";

export interface ITracksState {
  tracks: PlaylistItems[];
  total: number;
  previous: number;
}

export const initialTracksState = {
  tracks: [] as PlaylistItems[],
  total: 0,
  previous: 0,
};

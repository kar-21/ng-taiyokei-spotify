import { Playlists } from 'src/app/model/browse.model';

export interface PlaylistRequestModal {
  categoryId: string;
  previous: number;
}

export interface PlaylistResponseModal {
  playlists: Playlists[];
  total: number;
  previous: number;
}

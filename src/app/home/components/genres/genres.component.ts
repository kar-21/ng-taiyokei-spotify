import { Component, Input } from '@angular/core';

import { UIGenreModel } from 'src/app/model/browse.model';
import { BrowseService } from '../../services/browse.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent {
  genres: UIGenreModel[] = [];
  colors = [
    '#4C0033',
    '#790252',
    '#AF0171',
    '#E80F88',
    '#4C3575',
    '#5B4B8A',
    '#7858A6',
    '#395B64',
    '#472D2D',
    '#553939',
    '#704F4F',
    '#A77979',
    '#1D3E53',
    '#254B62',
    '#476D7C',
    '#5C5470',
    '#065471',
    '#F30A49',
    '#5C5470',
    '#5A082D',
    '#FF5722',
    '#932B77',
    '#A64942',
    '#9E579D',
  ];
  constructor(private browseService: BrowseService) {
    const token = sessionStorage.getItem('token');
    if (token)
      this.browseService.getAvailableGenre(token).subscribe((data) => {
        console.log('>>>>>', data);
        this.genres = data.genres.map((genre: string) => ({
          name: genre,
          color: this.getRandomColor(),
        }));
      });
  }

  getRandomColor = () => {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  };
}

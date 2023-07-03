import { CategoryPlaylistsComponent } from './components/category-playlists/category-playlists.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './components/categories/categories.component';
import { GenresComponent } from './components/genres/genres.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { FeaturedPlaylistsComponent } from './components/featured-playlists/featured-playlists.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: FeaturedPlaylistsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'genres', component: GenresComponent },
      { path: 'category-playlists', component: CategoryPlaylistsComponent },
      { path: 'playlists', component: PlaylistsComponent },
    ],
  },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

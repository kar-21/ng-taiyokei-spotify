import { CategoryPlaylistsComponent } from './components/category-playlists/category-playlists.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './components/categories/categories.component';
import { GenresComponent } from './components/genres/genres.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { FeaturedPlaylistsComponent } from './components/featured-playlists/featured-playlists.component';
import { Breadcrumb } from 'xng-breadcrumb/lib/types/breadcrumb';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: CategoriesComponent,
        data: { breadcrumb: 'Categories' },
      },
      {
        path: 'featured-playlist',
        component: FeaturedPlaylistsComponent,
        data: { breadcrumb: 'Featured Playlist' },
      },
      {
        path: 'genres',
        component: GenresComponent,
        data: { breadcrumb: 'Genres' },
      },
      {
        path: 'category-playlists',
        component: CategoryPlaylistsComponent,
        data: { breadcrumb: { alias: 'category-playlists' } },
      },
      {
        path: 'playlists',
        component: PlaylistsComponent,
        data: {
          breadcrumb: {
            label: 'playlists',
            routeInterceptor: (routeLink: RouterLink, breadcrumb: Breadcrumb) => {
              console.log('>>>>> routerling', routeLink.state);
            },
          },
        },
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { breadcrumb: 'Profile' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

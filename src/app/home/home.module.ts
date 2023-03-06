import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { GenresComponent } from './components/genres/genres.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FeaturedPlaylistsComponent } from './components/featured-playlists/featured-playlists.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { CategoryPlaylistsComponent } from './components/category-playlists/category-playlists.component';

@NgModule({
  declarations: [HomeComponent, ProfileComponent, GenresComponent, CategoriesComponent, FeaturedPlaylistsComponent, PlaylistsComponent, CategoryPlaylistsComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}

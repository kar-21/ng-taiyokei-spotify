import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { EffectsModule } from '@ngrx/effects';

import { environment } from 'src/environments/environment';
import { appReducer } from './store/reducers/app.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { UserProfileEffect } from './store/effects/userProfile.effect';
import { metaReducers } from './store/reducers/hydration.reducer';
import { CategoriesEffect } from './store/effects/categories.effect';
import { PlaylistsEffect } from './store/effects/playlists.effect';
import { TracksEffect } from './store/effects/tracks.effect';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducer, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      UserProfileEffect,
      CategoriesEffect,
      PlaylistsEffect,
      TracksEffect,
    ]),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}

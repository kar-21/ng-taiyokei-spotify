import { userProfileReducer } from './store/reducers/userProfileReducer';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { appReducer } from './store/reducers/app.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UserProfileEffect } from './store/effects/userProfile.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([UserProfileEffect]),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}

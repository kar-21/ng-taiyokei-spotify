import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginRedirectComponent } from './components/login-redirect/login-redirect.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, data: { breadcrumb: 'Login' }, },
  { path: 'redirectURI', component: LoginRedirectComponent,data: { breadcrumb: 'Redirect URL' }, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}

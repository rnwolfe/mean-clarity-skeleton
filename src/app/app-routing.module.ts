import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { ExampleSettingsComponent } from './settings/example-settings/example-settings.component';
import { LoginComponent } from './auth/login/login.component';
import { UserListComponent } from './settings/user-admin/user-list/user-list.component';
import { UserCreateComponent } from './settings/user-admin/user-create/user-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'settings', redirectTo: 'settings/example', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'settings/example', component: ExampleSettingsComponent, canActivate: [AuthGuard] },
  // Uncomment these 3 lines, and comment out the following 3 lines to enforce authentication
  // (This should be done after creating your first user in the skeleton app.)
  // { path: 'settings/users', component: UserListComponent, canActivate: [AuthGuard] },
  // { path: 'settings/users/create', component: UserCreateComponent, canActivate: [AuthGuard] },
  // { path: 'settings/users/edit/:userId', component: UserCreateComponent, canActivate: [AuthGuard] },
  { path: 'settings/users', component: UserListComponent },
  { path: 'settings/users/create', component: UserCreateComponent },
  { path: 'settings/users/edit/:userId', component: UserCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}

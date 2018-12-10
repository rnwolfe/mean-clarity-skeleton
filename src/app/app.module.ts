import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ClarityModule, ClrFormsNextModule, ClrLayoutModule } from '@clr/angular';

import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { SettingsNavComponent } from './settings/settings-nav/settings-nav.component';
import { ExampleSettingsComponent } from './settings/example-settings/example-settings.component';
import { LoginComponent } from './auth/login/login.component';
import { UserListComponent } from './settings/user-admin/user-list/user-list.component';
import { UserCreateComponent } from './settings/user-admin/user-create/user-create.component';
import { AlertComponent } from './alerts/alerts.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SettingsNavComponent,
    ExampleSettingsComponent,
    LoginComponent,
    UserListComponent,
    UserCreateComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    ClarityModule.forRoot(),
    ClrFormsNextModule,
    ClrLayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

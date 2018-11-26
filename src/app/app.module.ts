import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarMenuComponent } from './menu/sidebar-menu/sidebar-menu.component';
import { TopbarMenuComponent } from './menu/topbar-menu/topbar-menu.component';
import { BacklogModule } from './views/backlog/backlog.module';
import { SprintModule } from './views/sprint/sprint.module';
import { LoginComponent } from './views/login/login.component';
import { SecurityModule } from './security/security.module';
import { HELLO_WORLD_URL } from './shared/hello-world.service';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './views/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarMenuComponent,
    TopbarMenuComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    BacklogModule,
    SprintModule,
    SecurityModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HELLO_WORLD_URL,
      useValue: environment.api_url
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatListModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarMenuComponent } from './menu/sidebar-menu/sidebar-menu.component';
import { TopbarMenuComponent } from './menu/topbar-menu/topbar-menu.component';
import { BacklogModule } from './views/backlog/backlog.module';
import { SprintModule } from './views/sprint/sprint.module';
import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [AppComponent, SidebarMenuComponent, TopbarMenuComponent, LoginComponent],
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
    BacklogModule,
    SprintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

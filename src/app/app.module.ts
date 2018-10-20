import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BacklogComponent } from './views/backlog/backlog.component';
import { SprintComponent } from './views/sprint/sprint.component';

@NgModule({
  declarations: [AppComponent, BacklogComponent, SprintComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

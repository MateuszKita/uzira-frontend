import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import {
  MatExpansionModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [TeamsComponent]
})
export class TeamsModule {}

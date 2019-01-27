import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import {
  MatExpansionModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { CreateTeamDialogComponent } from './create-team-dialog/create-team-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule,
    FormsModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [TeamsComponent, CreateTeamDialogComponent],
  entryComponents: [CreateTeamDialogComponent]
})
export class TeamsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BacklogRoutingModule } from './backlog-routing.module';
import { BacklogComponent } from './backlog.component';
import {
  MatExpansionModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';
import { SprintExpansionPanelComponent } from './sprint-expansion-panel/sprint-expansion-panel.component';

@NgModule({
  imports: [
    CommonModule,
    BacklogRoutingModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [BacklogComponent, SprintExpansionPanelComponent]
})
export class BacklogModule {}

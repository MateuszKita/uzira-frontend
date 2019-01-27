import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BacklogRoutingModule } from './backlog-routing.module';
import { BacklogComponent } from './backlog.component';
import {
  MatExpansionModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatSelectModule
} from '@angular/material';
import { SprintExpansionPanelComponent } from './sprint-expansion-panel/sprint-expansion-panel.component';
import { CreateSprintDialogComponent } from 'src/app/shared/create-sprint-dialog/create-sprint-dialog.component';
import { FormsModule } from '@angular/forms';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    BacklogRoutingModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule
  ],
  declarations: [
    BacklogComponent,
    SprintExpansionPanelComponent,
    CreateSprintDialogComponent,
    CreateTaskDialogComponent
  ],
  entryComponents: [CreateSprintDialogComponent, CreateTaskDialogComponent]
})
export class BacklogModule {}

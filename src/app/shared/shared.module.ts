import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSprintDialogComponent } from './create-sprint-dialog/create-sprint-dialog.component';
import {
  MatExpansionModule,
  MatIconModule,
  MatTableModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatSelectModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule
  ],
  declarations: [CreateSprintDialogComponent, CreateTaskDialogComponent]
})
export class SharedModule {}

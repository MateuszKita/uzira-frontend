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
  MatSlideToggleModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

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
    FormsModule
  ],
  declarations: [CreateSprintDialogComponent]
})
export class SharedModule {}

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
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [CreateSprintDialogComponent]
})
export class SharedModule {}

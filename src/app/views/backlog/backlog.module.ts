import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BacklogRoutingModule } from './backlog-routing.module';
import { BacklogComponent } from './backlog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { SprintExpansionPanelComponent } from './sprint-expansion-panel/sprint-expansion-panel.component';
import { CreateSprintDialogComponent } from 'src/app/shared/create-sprint-dialog/create-sprint-dialog.component';
import { FormsModule } from '@angular/forms';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
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
    FormsModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  declarations: [
    BacklogComponent,
    SprintExpansionPanelComponent,
  ],
  entryComponents: [CreateSprintDialogComponent, CreateTaskDialogComponent]
})
export class BacklogModule {
}

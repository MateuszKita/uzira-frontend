import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintRoutingModule } from './sprint-routing.module';
import { SprintComponent } from './sprint.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SprintDragAndDropComponent } from './sprint-drag-and-drop/sprint-drag-and-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SprintRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    DragDropModule,
  ],
  declarations: [SprintComponent, SprintDragAndDropComponent]
})
export class SprintModule {
}

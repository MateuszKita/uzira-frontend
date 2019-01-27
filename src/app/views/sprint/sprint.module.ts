import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintRoutingModule } from './sprint-routing.module';
import { SprintComponent } from './sprint.component';
import { MatSelectModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SprintDragAndDropComponent } from './sprint-drag-and-drop/sprint-drag-and-drop.component';

@NgModule({
  imports: [
    CommonModule,
    SprintRoutingModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [SprintComponent, SprintDragAndDropComponent]
})
export class SprintModule {}

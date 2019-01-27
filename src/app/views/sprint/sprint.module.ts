import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintRoutingModule } from './sprint-routing.module';
import { SprintComponent } from './sprint.component';
import { MatSelectModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SprintRoutingModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [SprintComponent]
})
export class SprintModule {}

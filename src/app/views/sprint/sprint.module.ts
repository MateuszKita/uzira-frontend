import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintRoutingModule } from './sprint-routing.module';
import { SprintComponent } from './sprint.component';

@NgModule({
  imports: [CommonModule, SprintRoutingModule],
  declarations: [SprintComponent]
})
export class SprintModule {}

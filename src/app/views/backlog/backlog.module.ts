import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BacklogRoutingModule } from './backlog-routing.module';
import { BacklogComponent } from './backlog.component';

@NgModule({
  imports: [CommonModule, BacklogRoutingModule],
  declarations: [BacklogComponent]
})
export class BacklogModule {}

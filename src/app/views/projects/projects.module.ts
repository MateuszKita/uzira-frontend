import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule, MatProgressSpinnerModule, MatSelectModule } from '@angular/material';
import { EditProjectUsersComponent } from './edit-project-users/edit-project-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  declarations: [ProjectsComponent, CreateProjectDialogComponent, EditProjectUsersComponent],
  entryComponents: [CreateProjectDialogComponent, EditProjectUsersComponent]
})
export class ProjectsModule {
}

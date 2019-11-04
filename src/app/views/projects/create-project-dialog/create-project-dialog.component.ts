import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectsService } from '../../../core/services/projects.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent {
  public name: string;

  constructor(
    private readonly projectsService: ProjectsService,
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    this.projectsService.addNewProject(this.name).subscribe(
      res => {
        this.projectsService.selectedProjectId$.next(res.id);
        this.dialogRef.close();
      },
      (err: HttpErrorResponse) => {
        this.dialogRef.close();
        console.error(err);
      }
    );
  }
}

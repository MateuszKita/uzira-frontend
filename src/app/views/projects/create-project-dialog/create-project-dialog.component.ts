import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectsService } from '../../../core/services/projects.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../core/services/toast.service';
import { ToastType } from '../../../models/toast.model';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent {
  public name: string;
  public isLoading = false;

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly toastService: ToastService,
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
        if (this.projectsService.selectedProjectId$.getValue() === '0') {
          this.projectsService.selectedProjectId$.next(res._id);
        }
        this.toastService.openSnackBar(`Successfully added new Project - '${res.name}'`);
        this.dialogRef.close();
      },
      (err: HttpErrorResponse) => {
        this.toastService.openSnackBar(err.error.message, ToastType.ERROR);
        this.dialogRef.close();
      }
    );
  }
}

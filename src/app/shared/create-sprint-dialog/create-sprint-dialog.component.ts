import { Component, Inject } from '@angular/core';
import { SprintsService } from 'src/app/core/services/sprints.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { ToastService } from '../../core/services/toast.service';
import { ToastType } from '../../models/toast.model';

const DATE_FORMAT = 'YYYY-MM-DD';

@Component({
  selector: 'app-create-sprint-dialog',
  templateUrl: './create-sprint-dialog.component.html',
  styleUrls: ['./create-sprint-dialog.component.scss']
})
export class CreateSprintDialogComponent {
  public name: string;
  public active: boolean;
  public startDateValue: string;
  public endDateValue: string;

  constructor(
    private readonly sprintService: SprintsService,
    private readonly toastService: ToastService,
    public dialogRef: MatDialogRef<CreateSprintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onCreate(): void {
    this.sprintService
      .addSprint({
        active: this.active ? this.active : false,
        startDate: moment(this.startDateValue).format(DATE_FORMAT),
        endDate: moment(this.endDateValue).format(DATE_FORMAT)
      })
      .subscribe(
        (res) => {
          this.toastService.openSnackBar(res.message);
          this.dialogRef.close(true);
        },
        (err: HttpErrorResponse) => {
          this.toastService.openSnackBar(err.error.message, ToastType.ERROR);
          this.dialogRef.close(false);
          console.error(err);
        }
      );
  }
}

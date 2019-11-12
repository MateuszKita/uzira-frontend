import { Component, Inject } from '@angular/core';
import { SprintsService } from 'src/app/core/services/sprints.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

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
    public dialogRef: MatDialogRef<CreateSprintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

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
        () => {
          this.dialogRef.close(true);
        },
        (err: HttpErrorResponse) => {
          this.dialogRef.close(false);
          console.error(err);
        }
      );
  }
}

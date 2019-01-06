import { Component, OnInit, Inject } from '@angular/core';
import { SprintService } from 'src/app/core/services/sprint.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';

@Component({
  selector: 'app-create-sprint-dialog',
  templateUrl: './create-sprint-dialog.component.html',
  styleUrls: ['./create-sprint-dialog.component.scss']
})
export class CreateSprintDialogComponent implements OnInit {
  public name: string;
  public active: boolean;
  public startDateValue: string;
  public endDateValue: string;

  constructor(
    private readonly sprintService: SprintService,
    public dialogRef: MatDialogRef<CreateSprintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    this.sprintService
      .addSprint({
        active: this.active ? this.active : false,
        start_date: moment(this.startDateValue).format(DATE_FORMAT),
        end_date: moment(this.endDateValue).format(DATE_FORMAT)
      })
      .subscribe(
        () => {
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          this.dialogRef.close();
          console.error(err);
        }
      );
  }
}

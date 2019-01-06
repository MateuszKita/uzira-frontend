import { Component, OnInit, Inject } from '@angular/core';
import { SprintService } from 'src/app/core/services/sprint.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

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

  // {
  //   "active": true,
  //   "start_date": "2018-12-30",
  //   "end_date": "2019-01-05"
  // }

  onCreate(): void {
    console.log(this.active);
    console.log(this.startDateValue);
    console.log(this.endDateValue);

    //   this.sprintService.postNewTeam(this.name).subscribe(
    //     () => {
    //       this.dialogRef.close();
    //     },
    //     (err: HttpErrorResponse) => {
    //       this.dialogRef.close();
    //       console.error(err);
    //     }
    //   );
  }
}

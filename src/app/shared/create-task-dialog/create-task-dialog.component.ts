import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskType } from 'src/app/models/sprint.model';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {
  public name: string;
  public type: TaskType;
  public types: TaskType[] = [TaskType.DEFECT, TaskType.STORY, TaskType.TASK];
  public estimation: number;
  public estimates: number[] = [0, 1, 3, 5, 8, 13, 20, 40, 100];
  // public assigned = ;
  public sprint: number;
  public description = '';

  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data.id) {
      this.sprint = this.data.id;
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    console.log('create');
    // this.sprintService
    //   .addSprint({
    //     active: this.active ? this.active : false,
    //     start_date: moment(this.startDateValue).format(DATE_FORMAT),
    //     end_date: moment(this.endDateValue).format(DATE_FORMAT)
    //   })
    //   .subscribe(
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

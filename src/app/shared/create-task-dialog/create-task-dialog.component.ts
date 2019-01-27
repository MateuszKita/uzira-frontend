import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskType } from 'src/app/models/sprint.model';
import { BacklogService } from 'src/app/core/services/backlog.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    private readonly backlogService: BacklogService,
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
    this.backlogService
      .addTask({
        name: this.name,
        type: this.type,
        estimation: this.estimation,
        sprint: this.sprint > 0 ? this.sprint : undefined,
        description: this.description
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

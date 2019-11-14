import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskStatus, TaskType } from 'src/app/models/sprint.model';
import { BacklogService } from 'src/app/core/services/backlog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SprintsService } from '../../core/services/sprints.service';
import { Task } from 'src/app/models/task.model';
import { ToastService } from '../../core/services/toast.service';
import { ToastType } from '../../models/toast.model';

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
  public sprint: number;
  public description = '';
  public isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private readonly sprintsService: SprintsService,
    private readonly backlogService: BacklogService,
    private readonly toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    if (this.data.id) {
      this.sprint = this.data.id;
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onCreate(): void {
    const taskData: Task = {
      name: this.name,
      type: this.type,
      estimation: this.estimation,
      sprint: this.sprint > 0 ? this.sprint : undefined,
      description: this.description,
      status: TaskStatus.OPEN
    };
    (this.data.sprintId
      ? this.sprintsService.addTaskToSprint(this.data.sprintId, taskData)
      : this.backlogService.addTaskToBacklog(taskData))
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

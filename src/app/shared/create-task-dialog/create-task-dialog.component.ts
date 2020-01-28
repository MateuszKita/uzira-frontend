import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskStatus, TaskType } from 'src/app/models/sprint.model';
import { BacklogService } from 'src/app/core/services/backlog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SprintsService } from '../../core/services/sprints.service';
import { Task } from 'src/app/models/task.model';
import { ToastService } from '../../core/services/toast.service';
import { ToastType } from '../../models/toast.model';
import { TasksService } from '../../core/services/tasks.service';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from '../users.service';
import { Subject } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit, OnDestroy {
  public name: string;
  public type: TaskType;
  public types: TaskType[] = [TaskType.DEFECT, TaskType.STORY, TaskType.TASK];
  public estimation = -1;
  public estimates: number[] = [0, 1, 3, 5, 8, 13, 20, 40, 100];
  public sprint: number;
  public description = '';
  public isLoading = false;
  public createButtonDisabled = false;
  public allUsers: User[];
  public assignedUser: User;

  private readonly taskId: string = this.data.taskId;
  private onDestroy$: Subject<null> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private readonly sprintsService: SprintsService,
    private readonly backlogService: BacklogService,
    private readonly toastService: ToastService,
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    if (this.data.id) {
      this.sprint = this.data.id;
    }
    this.name = this.data.name;
    this.type = this.data.type;
    this.estimation = this.data.estimation || -1;
    this.description = this.data.description || '';
    this.getAllUsers();
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onCreate(): void {
    this.createButtonDisabled = true;
    const taskData: Task = {
      name: this.name,
      type: this.type,
      estimation: this.estimation,
      sprint: this.sprint > 0 ? this.sprint : undefined,
      description: this.description,
      status: this.data.status || TaskStatus.OPEN,
      assigned: this.assignedUser,
      _id: this.taskId
    };
    (this.data.name
      ? this.tasksService.updateTask(taskData)
      : this.data.sprintId
        ? this.sprintsService.addTaskToSprint(this.data.sprintId, taskData)
        : this.backlogService.addTaskToBacklog(taskData))
      .subscribe(
        (res) => {
          this.toastService.openSnackBar(res.message);
          this.dialogRef.close(true);
        },
        (err: HttpErrorResponse) => {
          this.toastService.openSnackBar(err.error.message, ToastType.ERROR);
          this.createButtonDisabled = false;
        }
      );
  }

  private getAllUsers(): void {
    this.usersService.getAllUsersSimpleList()
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(users => {
        this.allUsers = users;
        this.assignedUser = this.data.assignedUser;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

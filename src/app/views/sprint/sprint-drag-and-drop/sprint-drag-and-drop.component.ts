import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskStatus } from 'src/app/models/sprint.model';
import { TasksService } from 'src/app/core/services/tasks.service';
import { Task } from 'src/app/models/task.model';
import { take } from 'rxjs/operators';
import { ToastService } from '../../../core/services/toast.service';
import { ToastType } from '../../../models/toast.model';

@Component({
  selector: 'app-sprint-drag-and-drop',
  templateUrl: './sprint-drag-and-drop.component.html',
  styleUrls: ['./sprint-drag-and-drop.component.scss']
})
export class SprintDragAndDropComponent implements OnInit {

  @Input() tasks: Task[];

  public openItems: Task[] = [];
  public progressItems: Task[] = [];
  public reviewItems: Task[] = [];
  public verificationItems: Task[] = [];
  public readyItems: Task[] = [];
  public taskStatus: typeof TaskStatus = TaskStatus;

  constructor(
    private readonly tasksService: TasksService,
    private readonly toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.segregateTasks();
  }

  private segregateTasks(): void {
    this.tasks.forEach(task => {
      switch (task.status) {
        case TaskStatus.OPEN:
          this.openItems.push(task);
          break;
        case TaskStatus.IN_PROGRESS:
          this.progressItems.push(task);
          break;
        case TaskStatus.IN_REVIEW:
          this.reviewItems.push(task);
          break;
        case TaskStatus.IN_VERIFICATION:
          this.verificationItems.push(task);
          break;
        case TaskStatus.READY:
          this.readyItems.push(task);
          break;
        default:
      }
    });
  }

  private updateTask(data: Task, status: TaskStatus) {
    this.tasksService.updateTask({status, _id: data._id} as Task)
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this.toastService.openSnackBar(`Moved '${data.name}' to '${status}'`, ToastType.INFO);
      });
  }

  drop(event: CdkDragDrop<Task[]>, taskStatus: TaskStatus) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.updateTask(event.previousContainer.data[event.previousIndex], taskStatus);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

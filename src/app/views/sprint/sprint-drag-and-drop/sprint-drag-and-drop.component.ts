import { Component, OnInit, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { SprintTask, TaskStatus } from 'src/app/models/sprint.model';
import { TasksService } from 'src/app/core/services/tasks.service';

@Component({
  selector: 'app-sprint-drag-and-drop',
  templateUrl: './sprint-drag-and-drop.component.html',
  styleUrls: ['./sprint-drag-and-drop.component.scss']
})
export class SprintDragAndDropComponent implements OnInit {
  @Input() tasks: SprintTask[];
  public openItems: SprintTask[] = [];
  public progressItems: SprintTask[] = [];
  public reviewItems: SprintTask[] = [];
  public verificationItems: SprintTask[] = [];
  public readyItems: SprintTask[] = [];
  public taskStatus: typeof TaskStatus = TaskStatus;

  constructor(
    private readonly tasksService: TasksService
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

  private updateTask(data: SprintTask, status: TaskStatus) {
    data.status = status;
    this.tasksService.updateTask(data).subscribe();
  }

  drop(event: CdkDragDrop<SprintTask[]>, taskStatus: TaskStatus) {
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

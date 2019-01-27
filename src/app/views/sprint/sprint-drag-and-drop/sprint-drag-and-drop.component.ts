import { Component, OnInit, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { SprintTask, TaskStatus } from 'src/app/models/sprint.model';

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

  constructor() {}

  ngOnInit(): void {
    console.log(this.tasks);
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
          this.openItems.push(task);
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

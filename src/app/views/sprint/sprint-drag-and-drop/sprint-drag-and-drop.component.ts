import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sprint-drag-and-drop',
  templateUrl: './sprint-drag-and-drop.component.html',
  styleUrls: ['./sprint-drag-and-drop.component.scss']
})
export class SprintDragAndDropComponent implements OnInit {
  public open = ['test 1'];
  public progress = ['test 2'];
  public review = ['test 3'];
  public verification = ['test 4'];
  public done = ['test 5'];

  constructor() {}

  ngOnInit() {}

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

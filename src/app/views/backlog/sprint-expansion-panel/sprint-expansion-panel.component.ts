import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-sprint-expansion-panel',
  templateUrl: './sprint-expansion-panel.component.html',
  styleUrls: ['./sprint-expansion-panel.component.scss']
})
export class SprintExpansionPanelComponent {
  private _dataSource: Task[] = [];

  @Input()
  set dataSource(tasks: Task[]) {
    this._dataSource = tasks;
  }

  get dataSource(): Task[] {
    return this._dataSource;
  }

  @Input() expansionPanelTitle: string;
  @Input() expansionPanelSubtitle: string;
  @Input() sprintId: number;
  @Input() expanded: boolean;
  @Output() taskAddition = new EventEmitter<number>();

  public displayedColumns: string[] = [
    'name',
    'type',
    'estimation',
    'assigned'
  ];

  addTask(): void {
    this.taskAddition.emit(this.sprintId);
  }
}

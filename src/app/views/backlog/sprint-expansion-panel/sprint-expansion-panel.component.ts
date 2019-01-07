import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SprintTask } from 'src/app/models/sprint.model';

@Component({
  selector: 'app-sprint-expansion-panel',
  templateUrl: './sprint-expansion-panel.component.html',
  styleUrls: ['./sprint-expansion-panel.component.scss']
})
export class SprintExpansionPanelComponent implements OnInit {
  @Input() dataSource: SprintTask[] = [];
  @Input() expansionPanelTitle: string;
  @Input() expansionPanelSubtitle: string;
  @Input() sprintId: number;
  @Output() taskAddition = new EventEmitter<number>();

  public displayedColumns: string[] = [
    'name',
    'type',
    'estimation',
    'assigned'
  ];

  constructor() {}

  ngOnInit() {}

  addTask(): void {
    this.taskAddition.emit(this.sprintId);
  }
}

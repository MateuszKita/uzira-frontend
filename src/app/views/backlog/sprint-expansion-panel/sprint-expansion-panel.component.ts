import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from '../../../core/services/tasks.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastService } from '../../../core/services/toast.service';
import { ToastType } from '../../../models/toast.model';
import { CreateTaskDialogComponent } from '../../../shared/create-task-dialog/create-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { SprintGeneral } from '../../../models/sprint.model';
import { MatMenu, MatSelect } from '@angular/material';

@Component({
  selector: 'app-sprint-expansion-panel',
  templateUrl: './sprint-expansion-panel.component.html',
  styleUrls: ['./sprint-expansion-panel.component.scss']
})
export class SprintExpansionPanelComponent implements OnDestroy {

  private _dataSource: Task[] = [];
  private onDestroy$: Subject<null> = new Subject();

  public form = new FormGroup({
    sprints: new FormControl([]),
    search: new FormControl('')
  });

  @Input()
  set dataSource(tasks: Task[]) {
    this._dataSource = tasks;
  }

  get dataSource(): Task[] {
    return this._dataSource;
  }

  @Input() expansionPanelTitle: string;
  @Input() expansionPanelSubtitle: string;
  @Input() sprintId: string = null;
  @Input() expanded: boolean;
  @Input() sprints: SprintGeneral[];

  @Output() taskAddition = new EventEmitter<string>();
  @Output() backlogChange = new EventEmitter<string | null>();

  @ViewChild('select', {static: false}) sprintsSelect: MatSelect;
  @ViewChild('menu', {static: false}) moveMenu: MatMenu;

  public displayedColumns: string[] = [
    'name',
    'type',
    'estimation',
    'assigned',
    'edit',
    'move',
    'delete',
  ];

  constructor(
    private readonly tasksService: TasksService,
    private readonly toastService: ToastService,
    private readonly dialog: MatDialog
  ) {
  }

  addTask(): void {
    this.taskAddition.emit(this.sprintId);
  }

  editTask(task: Task): void {
    this.dialog.open(CreateTaskDialogComponent, {
      width: '350px',
      data: {
        name: task.name,
        description: task.description,
        estimation: task.estimation,
        type: task.type,
        id: this.sprintId,
        sprints: [],
        taskId: task._id
      }
    })
      .afterClosed()
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        this.backlogChange.emit(this.sprintId);
      });
  }

  moveTask(taskId: string, sprintId?: string): void {
    (this.sprintId
      ? this.tasksService.moveTaskToBacklog(taskId)
      : this.tasksService.moveTaskToSprint(taskId, sprintId))
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  deleteTask(taskId: string): void {
    this.tasksService.deleteTask(taskId)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe((res) => {
        this.toastService.openSnackBar(res.message);
        this.backlogChange.emit(this.sprintId);
      }, (error) => {
        this.toastService.openSnackBar(error.error.message || 'Could not delete this Task!', ToastType.ERROR);
      });
  }

  openSelect(): void {
    setTimeout(() => {
      // this.moveMenu.t;
      this.sprintsSelect.open();
    }, 500);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

}

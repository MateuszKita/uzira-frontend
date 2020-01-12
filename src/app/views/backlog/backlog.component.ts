import { Component, OnInit, OnDestroy } from '@angular/core';
import { BacklogService } from '../../core/services/backlog.service';
import { SprintGeneral } from 'src/app/models/sprint.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateSprintDialogComponent } from 'src/app/shared/create-sprint-dialog/create-sprint-dialog.component';
import { ProjectsService } from '../../core/services/projects.service';
import { catchError, filter, finalize, switchMap, takeUntil } from 'rxjs/operators';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { BehaviorSubject, EMPTY, forkJoin, Observable, of, Subject } from 'rxjs';
import { SprintsService } from '../../core/services/sprints.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<null> = new Subject();

  public selectedProjectId$: BehaviorSubject<string> = this.projectsService.selectedProjectId$;
  public tasks: Task[];
  public sprints: SprintGeneral[] = [];
  public isLoading = true;
  public isSprintExpanded: boolean[];
  public isBacklogExpanded = true;

  constructor(
    private readonly backlogService: BacklogService,
    private readonly projectsService: ProjectsService,
    private readonly sprintsService: SprintsService,
    public readonly dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getSelectedProjectTasks();
  }

  private processTasksData(data) {
    this.tasks = data[0].tasks;
    this.sprints = data[1];
    this.isSprintExpanded = new Array(this.sprints.length).map(() => false);
  }

  private getSelectedProjectTasks(): void {
    this.isLoading = true;
    this.selectedProjectId$
      .pipe(
        switchMap(() => forkJoin([
            this.backlogService.getBacklog().pipe(catchError(() => of({tasks: []}))),
            this.sprintsService.getSprints().pipe(catchError(() => of([])))
          ])
        ),
        finalize(() => this.isLoading = false),
        takeUntil(this.onDestroy$)
      )
      .subscribe(this.processTasksData.bind(this));
  }

  addSprint(): void {
    this.dialog.open(CreateSprintDialogComponent, {
      width: '250px',
      data: {name: 'add-project'}
    }).afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.sprintsService.getSprints()),
        takeUntil(this.onDestroy$)
      )
      .subscribe(sprints => {
        this.sprints = sprints;
      });
  }

  taskAddition(id: string, sprintId?: string) {
    this.dialog.open(CreateTaskDialogComponent, {
      width: '350px',
      data: {
        name: 'add-task',
        id,
        sprints: this.sprints,
        sprintId
      }
    }).afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.handleBacklogChanges(sprintId)),
      )
      .subscribe();
  }

  handleBacklogChanges(sprintId: string): Observable<any> {
    console.log('@@@', sprintId);
    return (sprintId ? this.sprintsService.getSprints() : this.backlogService.getBacklog())
      .pipe(
        switchMap(res => {
          sprintId
            ? this.sprints = res
            : this.tasks = res.tasks;
          this.expansionPanelsUpdate(sprintId);
          return EMPTY;
        }),
        takeUntil(this.onDestroy$)
      );
  }

  private expansionPanelsUpdate(sprintId: string): void {
    if (sprintId) {
      this.isBacklogExpanded = true;
      this.isSprintExpanded = new Array(this.sprints.length).map(() => false);
      const sprintIndex = this.sprints.findIndex(sprint => sprint._id === sprintId);
      this.isSprintExpanded[sprintIndex] = true;
    } else {
      this.isBacklogExpanded = true;
      this.isSprintExpanded = new Array(this.sprints.length).map(() => false);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { BacklogService } from '../../core/services/backlog.service';
import { SprintGeneral } from 'src/app/models/sprint.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateSprintDialogComponent } from 'src/app/shared/create-sprint-dialog/create-sprint-dialog.component';
import { ProjectsService } from '../../core/services/projects.service';
import { catchError, filter, finalize, switchMap, takeUntil } from 'rxjs/operators';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { BehaviorSubject, forkJoin, of, Subject } from 'rxjs';
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
    const dialogRef = this.dialog.open(CreateSprintDialogComponent, {
      width: '250px',
      data: {name: 'add-project'}
    });

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.sprintsService.getSprints()),
        takeUntil(this.onDestroy$)
      )
      .subscribe(sprints => {
        this.sprints = sprints;
      });
  }

  taskAddition(id: number, sprintId?: string) {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '350px',
      data: {
        name: 'add-task',
        id,
        sprints: this.sprints,
        sprintId
      }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => (sprintId ? this.sprintsService.getSprints() : this.backlogService.getBacklog())),
        takeUntil(this.onDestroy$)
      )
      .subscribe(res => {
        sprintId
          ? this.sprints = res
          : this.tasks = res.tasks;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

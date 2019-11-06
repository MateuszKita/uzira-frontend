import { Component, OnInit, OnDestroy } from '@angular/core';
import { BacklogService } from '../../core/services/backlog.service';
import { SprintTask, SprintGeneral } from 'src/app/models/sprint.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateSprintDialogComponent } from 'src/app/shared/create-sprint-dialog/create-sprint-dialog.component';
import { ProjectsService } from '../../core/services/projects.service';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { forkJoin, Subject } from 'rxjs';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<null> = new Subject();
  public selectedProjectId: string;
  public tasks: SprintTask[] = [];
  public sprints: SprintGeneral[] = [];

  constructor(
    private readonly backlogService: BacklogService,
    private readonly projectsService: ProjectsService,
    public readonly dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getTaskForSelectedProject();
  }

  private getBacklogAndSprints(): void {
    forkJoin([
      this.backlogService.getBacklog(),
      this.backlogService.getSprints()
    ])
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(this.processBacklogData);
  }

  private processBacklogData(data) {
    this.tasks = data[0].tasks;
    this.sprints = data[1];
  }

  private getTaskForSelectedProject(): void {
    console.log('getTaskForSelectedProject');
    this.projectsService.selectedProjectId$
      .pipe(
        switchMap(id => {
          this.selectedProjectId = id;
          return forkJoin([
            this.backlogService.getBacklog(),
            this.backlogService.getSprints()
          ]);
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe(this.processBacklogData.bind(this));
  }

  addSprint(): void {
    const dialogRef = this.dialog.open(CreateSprintDialogComponent, {
      width: '250px',
      data: {name: 'add-project'}
    });

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.backlogService.getSprints()),
        takeUntil(this.onDestroy$)
      )
      .subscribe(sprints => {
        this.sprints = sprints;
      });
  }

  taskAddition(id: number) {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '350px',
      data: {name: 'add-task', id, sprints: this.sprints}
    });

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.backlogService.getBacklog()),
        takeUntil(this.onDestroy$)
      )
      .subscribe(res => {
        this.tasks = res.tasks;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

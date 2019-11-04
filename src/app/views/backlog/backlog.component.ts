import { Component, OnInit, OnDestroy } from '@angular/core';
import { BacklogService } from '../../core/services/backlog.service';
import { SprintTask, SprintGeneral } from 'src/app/models/sprint.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateSprintDialogComponent } from 'src/app/shared/create-sprint-dialog/create-sprint-dialog.component';
import { ProjectsService } from '../../core/services/projects.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<null> = new Subject();
  public selectedProjectId: number;
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

  private getBacklogData(): void {
    this.backlogService
      .getBacklogAndSprints()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(this.processBacklogData);
  }

  private processBacklogData(data) {
    this.tasks = data.backlog.tasks;
    this.sprints = data.list;
  }

  private getTaskForSelectedProject(): void {
    this.projectsService.selectedProjectId$
      .pipe(
        switchMap(id => {
          this.selectedProjectId = id;
          this.projectChanged();
          return this.backlogService.getBacklogAndSprints();
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getBacklogData();
      }
    });
  }

  projectChanged(): void {
    this.getBacklogData();
  }

  taskAddition(id: number) {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '350px',
      data: {name: 'add-task', id, sprints: this.sprints}
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(result => {
        if (result) {
          this.getBacklogData();
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

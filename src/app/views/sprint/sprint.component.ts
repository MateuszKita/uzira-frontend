import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { SprintsService } from 'src/app/core/services/sprints.service';
import { SprintGeneral } from 'src/app/models/sprint.model';
import { takeUntil, switchMap, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<null> = new Subject();
  public currentSprint: SprintGeneral;
  public selectedSprintId: number;
  public sprints: SprintGeneral[];

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly sprintService: SprintsService
  ) {
  }

  ngOnInit(): void {
    this.getSprints();
  }

  private getSprints(): void {
    this.projectsService.selectedProjectId$
      .pipe(
        takeUntil(this.onDestroy$),
        filter(id => id !== '0'),
        switchMap(() => this.sprintService.getSprints().pipe(take(1)))
      )
      .subscribe(sprints => {
        this.sprints = sprints;
        this.selectedSprintId = sprints[sprints.length - 1].id;
        this.sprintChanged();
      });
  }

  sprintChanged(): void {
    this.currentSprint = this.sprints.find(
      sprint => sprint.id === this.selectedSprintId
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

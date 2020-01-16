import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { SprintsService } from 'src/app/core/services/sprints.service';
import { SprintGeneral } from 'src/app/models/sprint.model';
import { takeUntil, switchMap, filter, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<null> = new Subject();

  public currentSprint: SprintGeneral;
  public selectedSprintId: string;
  public sprints: SprintGeneral[];
  public isLoading = true;

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly sprintService: SprintsService
  ) {
  }

  ngOnInit(): void {
    this.getSprints();
  }

  private getSprints(): void {
    this.isLoading = true;
    this.projectsService.selectedProjectId$
      .pipe(
        switchMap(() => this.sprintService.getSprints()),
        finalize(() => this.isLoading = false),
        takeUntil(this.onDestroy$),
      )
      .subscribe(sprints => {
        this.sprints = sprints;
        if (this.sprints.length > 0) {
          this.selectedSprintId = sprints[sprints.length - 1]._id;
        }
        this.sprintChanged();
      });
  }

  sprintChanged(): void {
    this.currentSprint = this.sprints.find(
      sprint => sprint._id === this.selectedSprintId
    );
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

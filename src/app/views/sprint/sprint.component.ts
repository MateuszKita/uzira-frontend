import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TeamsService } from 'src/app/core/services/teams.service';
import { SprintService } from 'src/app/core/services/sprint.service';
import { SprintGeneral } from 'src/app/models/sprint.model';
import { takeUntil } from 'rxjs/operators';

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
    private readonly teamsService: TeamsService,
    private readonly sprintService: SprintService
  ) {}

  ngOnInit(): void {
    this.getSprints();
  }

  private getSprints(): void {
    this.sprintService
      .getSprints()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(sprints => {
        this.sprints = sprints;
        this.selectedSprintId = sprints[sprints.length - 1];
        this.sprintChanged();
      });
  }

  sprintChanged(): void {
    this.currentSprint = this.sprints.find(
      sprint => sprint.id === this.selectedSprintId
    );
    console.log(this.currentSprint);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

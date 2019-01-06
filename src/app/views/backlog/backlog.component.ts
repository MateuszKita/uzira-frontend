import { Component, OnInit } from '@angular/core';
import { BacklogService } from '../../core/services/backlog.service';
import { SprintTask } from 'src/app/models/sprint.model';
import { SprintService } from 'src/app/core/services/sprint.service';
import { MatDialog } from '@angular/material';
import { CreateSprintDialogComponent } from 'src/app/shared/create-sprint-dialog/create-sprint-dialog.component';
import { TeamsService } from '../../core/services/teams.service';
import { Team } from 'src/app/models/teams.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  public tasks: SprintTask[] = [];
  public sprints: string[] = [];
  public selectedTeam: number;
  public teams: Team[] = [];
  public dataLoaded = false;

  constructor(
    private readonly backlogService: BacklogService,
    private readonly sprintService: SprintService,
    private readonly teamsService: TeamsService,
    public readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTeamsAndTasks();
  }

  private getBacklogData(): void {
    this.backlogService
      .getBacklogAndSprints()
      .subscribe(this.processBacklogData);
  }

  private processBacklogData = data => {
    this.tasks = data.tasks;
    this.sprints = data.list;
    this.dataLoaded = true;
  };

  addSprint(): void {
    const dialogRef = this.dialog.open(CreateSprintDialogComponent, {
      width: '250px',
      data: { name: 'add-team' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBacklogData();
    });
  }

  getTeamsAndTasks(): void {
    this.teamsService
      .getTeams()
      .pipe(
        switchMap(teams => {
          this.teams = teams;
          if (teams.length) {
            this.selectedTeam = teams[0].id;
          }
          this.teamChanged();
          return this.backlogService.getBacklogAndSprints();
        })
      )
      .subscribe(this.processBacklogData);
  }

  teamChanged(): void {
    this.dataLoaded = false;
    this.backlogService.updateTeamId(this.selectedTeam);
    this.sprintService.updateTeamId(this.selectedTeam);
    this.getBacklogData();
  }
}

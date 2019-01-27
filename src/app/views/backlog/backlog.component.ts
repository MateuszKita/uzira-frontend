import { Component, OnInit } from '@angular/core';
import { BacklogService } from '../../core/services/backlog.service';
import { SprintTask, SprintGeneral } from 'src/app/models/sprint.model';
import { SprintService } from 'src/app/core/services/sprint.service';
import { MatDialog } from '@angular/material';
import { CreateSprintDialogComponent } from 'src/app/shared/create-sprint-dialog/create-sprint-dialog.component';
import { TeamsService } from '../../core/services/teams.service';
import { switchMap } from 'rxjs/operators';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  public selectedTeam: number;
  public tasks: SprintTask[] = [];
  public sprints: SprintGeneral[] = [];
  public dataLoaded = false;

  constructor(
    private readonly backlogService: BacklogService,
    private readonly sprintService: SprintService,
    private readonly teamsService: TeamsService,
    public readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTaskForSelectedTeam();
  }

  private getBacklogData(): void {
    this.backlogService
      .getBacklogAndSprints()
      .subscribe(this.processBacklogData);
  }

  private processBacklogData = data => {
    this.tasks = data.backlog.tasks;
    this.sprints = data.list;
    this.dataLoaded = true;
  }

  addSprint(): void {
    const dialogRef = this.dialog.open(CreateSprintDialogComponent, {
      width: '250px',
      data: { name: 'add-team' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBacklogData();
    });
  }

  getTaskForSelectedTeam(): void {
    this.teamsService
      .selectedTeam$
      .pipe(
        switchMap(teamId => {
          this.selectedTeam = teamId;
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

  taskAddition(id: number) {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '350px',
      data: { name: 'add-task', id, sprints: this.sprints }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBacklogData();
    });
  }
}

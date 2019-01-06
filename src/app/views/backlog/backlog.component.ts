import { Component, OnInit } from '@angular/core';
import { BacklogService } from '../../core/services/backlog.service';
import { SprintTask } from 'src/app/models/sprint.model';
import { SprintService } from 'src/app/core/services/sprint.service';
import { MatDialog } from '@angular/material';
import { CreateSprintDialogComponent } from 'src/app/shared/create-sprint-dialog/create-sprint-dialog.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  public tasks: SprintTask[] = [];
  public sprints: string[] = [];

  constructor(
    private readonly backlogService: BacklogService,
    private readonly sprintService: SprintService,
    public readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getBacklogData();
  }

  private getBacklogData(): void {
    this.backlogService.getBacklogAndSprints().subscribe(data => {
      this.tasks = data.tasks;
      this.sprints = data.list;
      console.log(data);
    });
  }

  addSprint(): void {
    console.log('add sprint');
    // {
    //   "active": true,
    //   "start_date": "2018-12-30",
    //   "end_date": "2019-01-05"
    // }
    const dialogRef = this.dialog.open(CreateSprintDialogComponent, {
      width: '250px',
      data: { name: 'add-team' }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.getTeams();
    });
  }
}

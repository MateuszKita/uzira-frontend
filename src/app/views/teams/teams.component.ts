import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/teams.model';
import { MatDialog } from '@angular/material';
import { CreateTeamDialogComponent } from './create-team-dialog/create-team-dialog.component';
import { TeamsService } from 'src/app/core/services/teams.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'action'];
  public dataSource: Team[] = [];

  constructor(
    private readonly teamsService: TeamsService,
    public readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getTeams();
  }

  openCreateTeamDialog(): void {
    const dialogRef = this.dialog.open(CreateTeamDialogComponent, {
      width: '250px',
      data: { name: 'add-team' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTeams();
    });
  }

  deleteTeam(id: number) {
    this.teamsService.deleteTeam(id).subscribe(
      () => {
        this.getTeams();
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.getTeams();
      }
    );
  }

  private getTeams(): void {
    this.teamsService.getTeams().subscribe(teams => {
      this.dataSource = teams;
    });
  }
}

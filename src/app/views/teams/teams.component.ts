import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/teams.model';
import { MatDialog } from '@angular/material';
import { CreateTeamDialogComponent } from './create-team-dialog/create-team-dialog.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name'];
  public dataSource: Team[] = [];

  constructor(public readonly dialog: MatDialog) {}

  ngOnInit() {}

  createTeam(): void {
    this.openDialog();
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(CreateTeamDialogComponent, {
      width: '250px',
      data: { name: 'hello' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

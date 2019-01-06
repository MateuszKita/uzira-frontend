import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/teams.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name'];
  public dataSource: Team[] = [];

  constructor() {}

  ngOnInit() {}

  public createTeam(): void {
    console.log('create team');
  }
}

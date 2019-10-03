import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Team } from 'src/app/models/teams.model';
import { TeamsService } from 'src/app/core/services/teams.service';
import { Router } from '@angular/router';
import { SecurityService } from '../../security/security.service';

@Component({
  selector: 'app-top-bar-menu',
  templateUrl: './top-bar-menu.component.html',
  styleUrls: ['./top-bar-menu.component.scss']
})
export class TopBarMenuComponent implements OnInit {
  public title = 'UZira';
  public imagePath = '../assets/uzira-logo.png';
  public teams: Team[] = [];
  public selectedTeam: number;

  public firstName: string;
  public lastName: string;

  constructor(
    private readonly userService: UserService,
    private readonly teamsService: TeamsService,
    private readonly securityService: SecurityService,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (res: { first_name: string; last_name: string }) => {
        this.firstName = res[0].first_name;
        this.lastName = res[0].last_name;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
    this.getTeams();
  }

  getTeams(): void {
    this.teamsService.getTeams().subscribe(teams => {
      this.teams = teams;
      if (teams.length) {
        this.selectedTeam = teams[0].id;
        this.teamsService.selectedTeam$.next(this.selectedTeam);
      }
    });
  }

  teamChanged(): void {
    this.teamsService.selectedTeam$.next(this.selectedTeam);
  }

  logout(): void {
    this.securityService.removeToken();
    this.router.navigate(['login']);
  }
}

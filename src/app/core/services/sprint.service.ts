import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SprintGeneral } from 'src/app/models/sprint.model';
import { TeamsService } from './teams.service';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private sprintUrl: string;
  public teamId: number;

  constructor(
    private readonly http: HttpClient,
    private readonly teamsService: TeamsService
  ) {
    this.teamsService.selectedTeam$.subscribe(teamId => {
      this.sprintUrl = `${environment.apiUrl}team/${teamId}/sprints/`;
    });
  }

  addSprint(data: SprintGeneral): Observable<any> {
    return this.http.post<any>(this.sprintUrl, data);
  }
}

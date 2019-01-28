import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SprintTask } from 'src/app/models/sprint.model';
import { TeamsService } from './teams.service';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  private backlogUrl: string;

  constructor(
    private readonly http: HttpClient,
    private readonly teamsService: TeamsService
  ) {
    this.teamsService.selectedTeam$
      .subscribe(teamId => {
        this.backlogUrl = `${environment.apiUrl}team/${teamId}/backlog/`;
      });
  }

  getBacklogAndSprints(): Observable<any> {
    return this.http.get<any>(this.backlogUrl);
  }

  addTask(data: SprintTask): Observable<any> {
    return this.http.post<any>(this.backlogUrl, data);
  }

  updateTask(data: SprintTask): Observable<any> {
    return this.http.put<any>(this.backlogUrl, data);
  }
}

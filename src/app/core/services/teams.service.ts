import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Team } from 'src/app/models/teams.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private teamsUrl: string;

  constructor(private readonly http: HttpClient) {
    this.teamsUrl = `${environment.apiUrl}team/`;
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<any>(this.teamsUrl);
  }

  postNewTeam(name: string): Observable<any> {
    return this.http.post<any>(this.teamsUrl, { name });
  }
}

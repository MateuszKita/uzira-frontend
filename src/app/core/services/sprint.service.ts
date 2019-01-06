import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SprintGeneral } from 'src/app/models/sprint.model';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private sprintUrl: string;
  public teamId: number;

  constructor(private readonly http: HttpClient) {
    this.sprintUrl = `${environment.apiUrl}team/${this.teamId}/sprints/`;
  }

  updateTeamId(id: number): void {
    this.teamId = id;
    this.sprintUrl = `${environment.apiUrl}team/${id}/sprints/`;
  }

  addSprint(data: SprintGeneral): Observable<any> {
    return this.http.post<any>(this.sprintUrl, data);
  }
}

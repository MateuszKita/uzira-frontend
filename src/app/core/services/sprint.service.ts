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

  constructor(private readonly http: HttpClient) {
    const teamId = 1;
    this.sprintUrl = `${environment.apiUrl}team/${teamId}/sprints/`;
  }

  addSprint(data: SprintGeneral): Observable<any> {
    return this.http.post<any>(this.sprintUrl, data);
  }
}

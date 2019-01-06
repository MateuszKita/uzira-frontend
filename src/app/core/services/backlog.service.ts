import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  private backlogUrl: string;
  public teamId: number;

  constructor(private readonly http: HttpClient) {
    this.backlogUrl = `${environment.apiUrl}team/${this.teamId}/backlog/`;
  }

  updateTeamId(id: number): void {
    this.teamId = id;
    this.backlogUrl = `${environment.apiUrl}team/${id}/backlog/`;
  }

  getBacklogAndSprints(): Observable<any> {
    return this.http.get<any>(this.backlogUrl);
  }
}

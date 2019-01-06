import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  private backlogUrl: string;

  constructor(private readonly http: HttpClient) {
    const teamId = 1;
    this.backlogUrl = `${environment.apiUrl}${teamId}/backlog/`;
  }

  getBacklogAndSprints(): Observable<any> {
    return this.http.get<any>(this.backlogUrl);
  }
}

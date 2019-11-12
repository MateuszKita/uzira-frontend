import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProjectsService } from './projects.service';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  constructor(
    private readonly http: HttpClient,
    private readonly projectsService: ProjectsService
  ) {
  }

  private getBacklogUrl(): string {
    return `${environment.apiUrl}projects/${this.projectsService.selectedProjectId$.getValue()}/backlog`;
  }

  getBacklog(): Observable<any> {
    return this.http.get<any>(this.getBacklogUrl());
  }

  addTaskToBacklog(data: Task): Observable<any> {
    return this.http.post<any>(this.getBacklogUrl(), data);
  }
}

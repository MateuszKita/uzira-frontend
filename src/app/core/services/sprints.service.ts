import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SprintGeneral } from 'src/app/models/sprint.model';
import { ProjectsService } from './projects.service';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {
  constructor(
    private readonly http: HttpClient,
    private readonly projectsService: ProjectsService
  ) {
  }

  private getSprintsUrl(sprintId?: string): string {
    return `${environment.apiUrl}projects/${this.projectsService.selectedProjectId$.getValue()}/sprints/${sprintId ? sprintId : ''}`;
  }

  addSprint(data: SprintGeneral): Observable<any> {
    return this.http.post(this.getSprintsUrl(), data);
  }

  getSprints(): Observable<SprintGeneral[]> {
    return this.http.get<SprintGeneral[]>(this.getSprintsUrl());
  }

  getSprintDetails(sprintId: string): Observable<SprintGeneral> {
    return this.http.get<SprintGeneral>(this.getSprintsUrl(sprintId));
  }

  updateSprint(sprintId: string, data: SprintGeneral): Observable<SprintGeneral> {
    return this.http.patch<SprintGeneral>(this.getSprintsUrl(sprintId), data);
  }

  deleteSprint(sprintId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.getSprintsUrl(sprintId));
  }

  addTaskToSprint(sprintId: string, data: Task): Observable<Task> {
    return this.http.post<Task>(this.getSprintsUrl(sprintId), data);
  }
}

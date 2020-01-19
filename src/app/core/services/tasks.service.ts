import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProjectsService } from './projects.service';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(
    private readonly http: HttpClient,
    private readonly projectsService: ProjectsService
  ) {
  }

  private getTasksUrl(taskId: string): string {
    return `${environment.apiUrl}projects/${this.projectsService.selectedProjectId$.getValue()}/tasks/${taskId}`;
  }

  updateTask(data: Task): Observable<any> {
    const taskId = data._id;
    delete data._id;
    return this.http.patch<any>(this.getTasksUrl(taskId), data);
  }

  getTask(taskId: string): Observable<any> {
    return this.http.get<Task>(this.getTasksUrl(taskId));
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(this.getTasksUrl(taskId));
  }

  moveTaskToBacklog(taskId: string): Observable<any> {
    return this.http.post<Task>(`${this.getTasksUrl(taskId)}/toBacklog`, null);
  }

  moveTaskToSprint(taskId: string, sprintId: string): Observable<any> {
    return this.http.post<Task>(`${this.getTasksUrl(taskId)}/toSprint/${sprintId}`, null);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SprintTask } from 'src/app/models/sprint.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly tasksUrl: string = `${environment.apiUrl}tasks`;

  constructor(
    private readonly http: HttpClient
  ) {
  }

  updateTask(data: SprintTask): Observable<any> {
    delete data.description;
    delete data.subtasks;
    return this.http.put<any>(`${this.tasksUrl}${data.id}/`, data);
  }
}

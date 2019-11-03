import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SprintTask } from 'src/app/models/sprint.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private backlogUrl: string;
  private taskId: string;

  constructor(private readonly http: HttpClient) {
    this.backlogUrl = `${environment.apiUrl}task/`;
  }

  updateTask(data: SprintTask): Observable<any> {
    delete data.description;
    delete data.subtasks;

    return this.http.put<any>(`${this.backlogUrl}${data.id}/`, data);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SprintTask } from 'src/app/models/sprint.model';
import { ProjectsService } from './projects.service';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  private backlogUrl: string;

  constructor(
    private readonly http: HttpClient,
    private readonly projectsService: ProjectsService
  ) {
    this.projectsService.selectedProjectId$
      .subscribe(id => {
        this.backlogUrl = `${environment.apiUrl}project/${id}/backlog/`;
      });
  }

  getBacklogAndSprints(): Observable<any> {
    return this.http.get<any>(this.backlogUrl);
  }

  addTask(data: SprintTask): Observable<any> {
    return this.http.post<any>(this.backlogUrl, data);
  }

  updateTask(data: SprintTask): Observable<any> {
    return this.http.put<any>(this.backlogUrl, data);
  }
}

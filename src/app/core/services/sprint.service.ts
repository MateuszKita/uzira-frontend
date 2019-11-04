import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SprintGeneral } from 'src/app/models/sprint.model';
import { ProjectsService } from './projects.service';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private sprintUrl: string;
  public projectId: number;

  constructor(
    private readonly http: HttpClient,
    private readonly projectsService: ProjectsService
  ) {
    this.projectsService.selectedProjectId$.subscribe(id => {
      this.sprintUrl = `${environment.apiUrl}project/${id}/sprints/`;
    });
  }

  addSprint(data: SprintGeneral): Observable<any> {
    return this.http.post(this.sprintUrl, data);
  }

  getSprints(): Observable<SprintGeneral[]> {
    return this.http.get<SprintGeneral[]>(this.sprintUrl);
  }
}

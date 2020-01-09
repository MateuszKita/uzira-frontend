import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Project } from 'src/app/models/projects.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly projectsUrl: string = `${environment.apiUrl}projects/`;
  public selectedProjectId$: BehaviorSubject<string> = new BehaviorSubject('0');
  public projectsChanged$: Subject<void> = new Subject();

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<any>(this.projectsUrl);
  }

  addNewProject(name: string): Observable<any> {
    return this.http.post<any>(this.projectsUrl, {name});
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.projectsUrl}${id}`);
  }

  getProjectUsers(projectId: string): Observable<User[]> {
    return this.http.get<any>(`${this.projectsUrl}${projectId}/users/`);
  }

  addUserToProject(projectId: string, userId: string): Observable<any> {
    return this.http.post(`${this.projectsUrl}${projectId}/users/${userId}`, {});
  }

  removeUserFromProject(projectId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.projectsUrl}${projectId}/users/${userId}`, {});
  }
}

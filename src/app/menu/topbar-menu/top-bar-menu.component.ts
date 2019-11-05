import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from 'src/app/models/projects.model';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { Router } from '@angular/router';
import { SecurityService } from '../../security/security.service';

@Component({
  selector: 'app-top-bar-menu',
  templateUrl: './top-bar-menu.component.html',
  styleUrls: ['./top-bar-menu.component.scss']
})
export class TopBarMenuComponent implements OnInit {
  public title = 'UZira';
  public imagePath = '../assets/uzira-logo.png';
  public projects: Project[] = [];
  public selectedProjectId: number;

  public name: string;

  constructor(
    private readonly userService: UserService,
    private readonly projectsService: ProjectsService,
    private readonly securityService: SecurityService,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
    this.userService.getMe()
      .subscribe(
        (res: any) => {
          this.name = res.name;
        },
        (err: HttpErrorResponse) => {
          console.error(err);
        }
      );
    this.getProjects();
  }

  getProjects(): void {
    this.projectsService.getProjects().subscribe(projects => {
      this.projects = projects;
      if (projects.length) {
        this.selectedProjectId = projects[0]._id;
        this.projectsService.selectedProjectId$.next(this.selectedProjectId);
      }
    });
  }

  projectChanged(): void {
    this.projectsService.selectedProjectId$.next(this.selectedProjectId);
  }

  logout(): void {
    this.securityService.removeToken();
    this.router.navigate(['login']);
  }
}

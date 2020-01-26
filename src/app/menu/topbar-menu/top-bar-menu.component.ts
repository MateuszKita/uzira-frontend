import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/users.service';
import { Project } from 'src/app/models/projects.model';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { Router } from '@angular/router';
import { SecurityService } from '../../security/security.service';
import { ToastService } from '../../core/services/toast.service';
import { ToastType } from '../../models/toast.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-top-bar-menu',
  templateUrl: './top-bar-menu.component.html',
  styleUrls: ['./top-bar-menu.component.scss']
})
export class TopBarMenuComponent implements OnInit {

  public title = 'UZira';
  public imagePath = '../assets/uzira-logo.png';
  public projects: Project[] = [];
  public selectedProjectId = '0';
  public name: string;

  constructor(
    private readonly userService: UsersService,
    private readonly projectsService: ProjectsService,
    private readonly securityService: SecurityService,
    private readonly router: Router,
    private readonly toastService: ToastService,
  ) {
  }

  ngOnInit() {
    this.userService.getMe()
      .subscribe(
        (res: any) => {
          this.name = res.name;
        }
      );
    this.getProjects();
    this.watchProjectsChange();
  }

  private watchProjectsChange(): void {
    this.projectsService.projectsChanged$
      .pipe(
        switchMap(() => this.projectsService.getProjects())
      )
      .subscribe(projects => {
        this.projects = projects;
        if (this.selectedProjectId === '0' || projects.length === 1) {
          this.selectedProjectId = projects[0]._id;
          this.projectsService.selectedProjectId$.next(this.selectedProjectId);
        }
      });
  }

  getProjects(): void {
    this.projectsService.getProjects()
      .subscribe(projects => {
        this.projects = projects;
        if (projects.length > 0) {
          this.selectedProjectId = projects[0]._id;
          this.projectsService.selectedProjectId$.next(this.selectedProjectId);
        }
      });
  }

  projectChanged($event): void {
    this.projectsService.selectedProjectId$.next($event.value);
  }

  logout(): void {
    this.toastService.openSnackBar('Logging out...', ToastType.INFO);
    this.securityService.logout()
      .subscribe(() => {
        this.toastService.openSnackBar('Logged out!');
        this.securityService.removeToken();
        this.router.navigate(['login']);
      });
  }

}

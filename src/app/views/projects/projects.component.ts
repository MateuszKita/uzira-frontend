import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { EditProjectUsersComponent } from './edit-project-users/edit-project-users.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<null> = new Subject();

  public displayedColumns: string[] = ['no', 'name', 'users', 'action'];
  public dataSource: Project[] = [];
  public disabledDeleteIndexes: boolean[] = [];
  public isLoading = true;
  public projectsUsersNames: string[];

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly toastService: ToastService,
    private readonly dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getProjects();
  }

  openCreateProjectDialog(): void {
    this.dialog.open(CreateProjectDialogComponent, {
      width: '250px',
      data: {name: 'add-project'}
    }).afterClosed()
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(result => {
        if (result) {
          this.getProjects();
          this.projectsService.projectsChanged$.next();
        }
      });
  }

  deleteProject(id: string) {
    this.projectsService.deleteProject(id)
      .pipe(
        finalize(() => this.disabledDeleteIndexes = [])
      )
      .subscribe(
        () => {
          this.toastService.openSnackBar(`Successfully deleted Project`);
          if (id === this.projectsService.selectedProjectId$.getValue()) {
            this.projectsService.selectedProjectId$.next('0');
          }
          this.getProjects();
          this.projectsService.projectsChanged$.next();
        },
        (err: HttpErrorResponse) => {
          this.toastService.openSnackBar(`Could not delete project`);
        }
      );
  }

  editProjectUsers(projectId: string): void {
    this.dialog.open(EditProjectUsersComponent, {
      minWidth: '250px',
      maxWidth: '1000px',
      width: '60vw',
      data: {projectId}
    }).afterClosed()
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        this.getProjects();
      });
  }

  private getProjects(): void {
    this.isLoading = true;
    this.projectsService.getProjects()
      .pipe(
        finalize(() => this.isLoading = false),
        switchMap(projects => {
          this.dataSource = projects;
          return forkJoin(projects.map(project => project._id).map(id => this.projectsService.getProjectUsers(id)));
        }),
        takeUntil(this.onDestroy$),
      )
      .subscribe(projectsUsers => {
        this.projectsUsersNames = projectsUsers.map(users => users.map(user => user.name).join(', '));
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

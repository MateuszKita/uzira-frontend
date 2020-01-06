import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<null> = new Subject();

  public displayedColumns: string[] = ['no', 'name', 'action'];
  public dataSource: Project[] = [];
  public disabledDeleteIndexes: boolean[] = [];
  public isLoading = true;

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly toastService: ToastService,
    public readonly dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getProjects();
  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
      width: '250px',
      data: {name: 'add-project'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProjects();
      this.projectsService.projectsChanged$.next();
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
          console.error(err);
        }
      );
  }

  private getProjects(): void {
    this.isLoading = true;
    this.projectsService.getProjects()
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.onDestroy$),
      )
      .subscribe(projects => {
        this.dataSource = projects;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

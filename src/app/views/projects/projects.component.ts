import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public displayedColumns: string[] = ['no', 'name', 'action'];
  public dataSource: Project[] = [];

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
    this.projectsService.getProjects().subscribe(projects => {
      this.dataSource = projects;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    });
  }

  deleteProject(id: string) {
    this.projectsService.deleteProject(id).subscribe(
      () => {
        this.getProjects();
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.getProjects();
      }
    );
  }

  private getProjects(): void {
    this.projectsService.getProjects().subscribe(projects => {
      this.dataSource = projects;
    });
  }
}

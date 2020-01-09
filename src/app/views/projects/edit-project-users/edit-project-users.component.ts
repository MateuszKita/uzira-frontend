import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectsService } from '../../../core/services/projects.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../../models/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastType } from '../../../models/toast.model';
import { ToastService } from '../../../core/services/toast.service';
import { CONFLICT } from 'http-status-codes';

@Component({
  selector: 'app-edit-project-users',
  templateUrl: './edit-project-users.component.html',
  styleUrls: ['./edit-project-users.component.scss']
})
export class EditProjectUsersComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<null> = new Subject();

  form = new FormGroup({
    users: new FormControl([]),
    search: new FormControl('')
  });

  users: User[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { projectId: string },
    public dialogRef: MatDialogRef<EditProjectUsersComponent>,
    private readonly projectsService: ProjectsService,
    private readonly toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.getProjectUsers();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  removeUser(userId: string): void {
    this.projectsService.removeUserFromProject(this.data.projectId, userId)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(res => {
        console.log(res);
      }, err => {
        if (err.error.message) {
          this.toastService.openSnackBar(err.error.message, ToastType.ERROR);
        }
      });
  }

  private getProjectUsers(): void {
    this.projectsService.getProjectUsers(this.data.projectId)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(users => {
        this.users = users;
      });
  }

  addUser(user: User): void {
    this.projectsService.addUserToProject(this.data.projectId, user._id)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        this.users = [...this.users, user];
      }, err => {
        if (err.status === CONFLICT && err.error && err.error.message) {
          this.toastService.openSnackBar(err.error.message, ToastType.INFO);
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

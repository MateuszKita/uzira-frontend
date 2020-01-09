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
import { UsersService } from '../../../shared/users.service';

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

  projectUsers: User[];
  allUsers: User[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { projectId: string },
    public dialogRef: MatDialogRef<EditProjectUsersComponent>,
    private readonly projectsService: ProjectsService,
    private readonly toastService: ToastService,
    private readonly usersService: UsersService
  ) {
  }

  ngOnInit() {
    this.getProjectUsers();
    this.getAllUsers();
  }

  private getProjectUsers(): void {
    this.projectsService.getProjectUsers(this.data.projectId)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(users => {
        this.projectUsers = users;
      });
  }

  private getAllUsers(): void {
    this.usersService.getAllUsersSimpleList()
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(users => {
        this.allUsers = users;
      });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  removeUser(userId: string): void {
    this.projectsService.removeUserFromProject(this.data.projectId, userId)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        const userToRemoveIndex = this.projectUsers.findIndex(user => user._id === userId);
        this.projectUsers.splice(userToRemoveIndex, 1);
      }, err => {
        if (err.error.message) {
          this.toastService.openSnackBar(err.error.message, ToastType.ERROR);
        } else {
          this.toastService.openSnackBar('Could not remove user from project.', ToastType.ERROR);
        }
      });
  }

  addUser(user: User): void {
    this.projectsService.addUserToProject(this.data.projectId, user._id)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        this.projectUsers = [...this.projectUsers, user];
      }, err => {
        if (err.status === CONFLICT && err.error && err.error.message) {
          this.toastService.openSnackBar(err.error.message, ToastType.INFO);
        } else {
          this.toastService.openSnackBar('Could not add user to project.', ToastType.ERROR);
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

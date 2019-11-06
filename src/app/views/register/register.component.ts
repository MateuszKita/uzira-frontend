import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from '../../security/security.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ToastService } from '../../core/services/toast.service';
import { ToastType } from '../../models/toast.model';
import { BAD_REQUEST } from 'http-status-codes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public title = 'UZira';
  public imagePath = '../assets/uzira-logo.png';
  public registerFormGroup: FormGroup;
  public registerButtonDisabled: boolean;
  public isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly securityService: SecurityService,
    private readonly toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.registerFormGroup = this.createFormGroup();
    this.disableButtonIfFormInvalid();
  }

  cancel(): void {
    this.router.navigate(['/login']);
  }

  register(): void {
    this.isLoading = true;
    this.securityService.register(this.registerFormGroup.value)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe((res) => {
          this.toastService.openSnackBar(`Successfully created new user: '${res.user.name}'`);
          this.router.navigate(['/login']);
        }, (err: HttpErrorResponse) => {
          this.toastService.openSnackBar(err.status === BAD_REQUEST
            ? 'Form is filled incorrectly'
            : 'Could not create new user', ToastType.ERROR);
          console.error(err);
        }
      );
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      email: '',
      password: '',
      name: ''
    });
  }

  private disableButtonIfFormInvalid(): void {
    this.registerFormGroup.statusChanges.subscribe((status: string) => {
      switch (status) {
        case 'VALID':
          this.registerButtonDisabled = false;
          break;
        case 'INVALID':
          this.registerButtonDisabled = true;
          break;
        default:
      }
    });
  }
}

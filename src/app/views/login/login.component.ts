import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SecurityService } from '../../security/security.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../core/services/toast.service';
import { ToastType } from '../../models/toast.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public title = 'UZira';
  public imagePath = '../assets/uzira-logo.png';
  public loginFormGroup: FormGroup;
  public loginButtonDisabled: boolean;
  public isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly securityService: SecurityService,
    private readonly toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.loginFormGroup = this.createFormGroup();
    this.disableButtonIfFormInvalid();
  }

  login(): void {
    this.isLoading = true;
    this.securityService.login(this.loginFormGroup.value)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        (userBody: any) => {
          this.securityService.setToken(userBody.token);
          this.router.navigate(['backlog']);
          this.toastService.openSnackBar('Successfully logged in!');
        },
        (err: HttpErrorResponse) => {
          this.toastService.openSnackBar('Could not log in...', ToastType.ERROR);
          console.error(err);
        }
      );
  }

  register(): void {
    this.router.navigate(['/register']);
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      email: '',
      password: ''
    });
  }

  private disableButtonIfFormInvalid(): void {
    this.loginFormGroup.statusChanges
      .subscribe((status: string) => {
        switch (status) {
          case 'VALID':
            this.loginButtonDisabled = false;
            break;
          case 'INVALID':
            this.loginButtonDisabled = true;
            break;
          default:
        }
      });
  }
}

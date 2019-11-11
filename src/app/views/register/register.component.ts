import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from '../../security/security.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, switchMap } from 'rxjs/operators';
import { ToastService } from '../../core/services/toast.service';
import { ToastType } from '../../models/toast.model';
import { BAD_REQUEST, CONFLICT } from 'http-status-codes';

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
          let errorMessage: string;
          switch (err.status) {
            case BAD_REQUEST:
              errorMessage = 'Form is filled incorrectly!';
              break;
            case CONFLICT:
              errorMessage = 'This e-mail is already taken!';
              break;
            default:
              errorMessage = 'Could not create new user!';
          }
          this.toastService.openSnackBar(errorMessage, ToastType.ERROR);
          console.error(err);
        }
      );
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
      name: new FormControl('', [Validators.required]),
    });
  }
}

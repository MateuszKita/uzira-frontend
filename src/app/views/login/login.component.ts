import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SecurityService } from '../../security/security.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.createFormGroup();
    this.disableButtonIfFormInvalid();
  }

  login(): void {
    this.securityService.login(this.loginFormGroup.value).subscribe(
      (token: string) => {
        this.securityService.setToken(token);
        this.router.navigate(['backlog']);
      },
      (err: HttpErrorResponse) => {
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
    this.loginFormGroup.statusChanges.subscribe((status: string) => {
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

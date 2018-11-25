import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.registerFormGroup = this.createFormGroup();
    this.disableButtonIfFormInvalid();
  }

  cancel(): void {
    this.router.navigate(['/login']);
  }

  register(): void {
    console.log(this.registerFormGroup.value, this.registerFormGroup.valid);
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      email: '',
      password: '',
      firstName: '',
      lastName: ''
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public title = 'UZira';
  public imagePath = '../assets/uzira-logo.png';
  public loginFormGroup: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.createFormGroup();
  }

  login(): void {
    console.log(this.loginFormGroup.value);
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      username: '',
      password: ''
    });
  }
}

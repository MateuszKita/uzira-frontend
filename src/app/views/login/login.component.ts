import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public username: string;
  public password: string;
  public title = 'UZira';
  public imagePath = '../assets/uzira-logo.png';

  constructor(private router: Router) {}

  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      sessionStorage.setItem('token', JSON.stringify('token'));
      this.router.navigate(['backlog']);
    } else {
      alert('Invalid credentials');
    }
  }
}

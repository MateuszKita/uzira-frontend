import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Observable } from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-topbar-menu',
  templateUrl: './topbar-menu.component.html',
  styleUrls: ['./topbar-menu.component.scss']
})
export class TopbarMenuComponent implements OnInit {
  public title = 'UZira';
  public imagePath = '../assets/uzira-logo.png';

  public firstName: string;
  public lastName: string;

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (res: {first_name: string , last_name: string}) => {
        this.firstName = res[0].first_name;
        this.lastName = res[0].last_name;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
    
  }
}

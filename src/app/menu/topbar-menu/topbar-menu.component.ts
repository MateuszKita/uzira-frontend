import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar-menu',
  templateUrl: './topbar-menu.component.html',
  styleUrls: ['./topbar-menu.component.scss']
})
export class TopbarMenuComponent implements OnInit {
  public title = 'UZira';
  public imagePath = '../assets/uzira-logo.png';

  constructor() {}

  ngOnInit() {}
}

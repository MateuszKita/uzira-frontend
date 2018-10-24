import { Component, OnInit } from '@angular/core';
import { NavListItem } from './sidebar-menu.model';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  public navList: NavListItem[] = [
    {
      label: 'Backlog',
      path: '/backlog'
    },
    {
      label: 'Sprint',
      path: '/sprint'
    }
  ];

  constructor() {}

  ngOnInit() {}
}

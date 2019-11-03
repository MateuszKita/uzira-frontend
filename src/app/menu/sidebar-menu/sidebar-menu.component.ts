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
      label: 'Add task',
      path: '/add-task',
      iconName: 'add_circle'
    },
    {
      label: 'Backlog',
      path: '/backlog',
      iconName: 'storage'
    },
    {
      label: 'Active Sprints',
      path: '/sprint',
      iconName: 'view_week'
    },
    {
      label: 'Teams',
      path: '/teams',
      iconName: 'people'
    }
  ];

  constructor() {}

  ngOnInit() {}
}

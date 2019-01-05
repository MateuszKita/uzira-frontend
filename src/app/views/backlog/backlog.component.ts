import { Component, OnInit } from '@angular/core';
import { HelloWorldService } from '../../shared/hello-world.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  public title1 = 'tytuł 1';
  public title2 = 'tytuł 2';

  constructor(private readonly helloWorldService: HelloWorldService) {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { HelloWorldService } from '../../shared/hello-world.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  constructor(private readonly helloWorldService: HelloWorldService) {}

  ngOnInit(): void {
    this.helloWorldService.getHelloWorld().subscribe(
      res => {
        console.log('res');
      },
      error => {
        console.log('error');
      }
    );
  }
}

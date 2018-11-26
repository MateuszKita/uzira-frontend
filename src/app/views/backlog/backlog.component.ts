import { Component, OnInit } from '@angular/core';
import { HelloWorldService } from '../../shared/hello-world.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  public helloWorldMessage: string;

  constructor(private readonly helloWorldService: HelloWorldService) {}

  ngOnInit(): void {
    this.helloWorldService.getHelloWorld().subscribe(
      (res: { message: string }) => {
        this.helloWorldMessage = res.message;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { BacklogService } from '../../core/services/backlog.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  constructor(private readonly backlogService: BacklogService) {}

  ngOnInit(): void {
    this.getBacklogData();
  }

  private getBacklogData(): void {
    this.backlogService.getBacklogAndSprints().subscribe(data => {
      console.log(data);
    });
  }
}

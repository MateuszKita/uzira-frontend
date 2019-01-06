import { Component, OnInit } from '@angular/core';
import { BacklogService } from '../../core/services/backlog.service';
import { SprintTask } from 'src/app/models/sprint.model';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  public tasks: SprintTask[] = [];
  public sprints: string[] = [];

  constructor(private readonly backlogService: BacklogService) {}

  ngOnInit(): void {
    this.getBacklogData();
  }

  private getBacklogData(): void {
    this.backlogService.getBacklogAndSprints().subscribe(data => {
      this.tasks = data.tasks;
      this.sprints = data.list;
      console.log(data);
    });
  }

  addSprint(): void {
    console.log('add sprint');
  }
}

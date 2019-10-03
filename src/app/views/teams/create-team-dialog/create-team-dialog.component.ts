import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TeamsService } from '../../../core/services/teams.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-team-dialog',
  templateUrl: './create-team-dialog.component.html',
  styleUrls: ['./create-team-dialog.component.scss']
})
export class CreateTeamDialogComponent implements OnInit {
  public name: string;

  constructor(
    private readonly teamsService: TeamsService,
    public dialogRef: MatDialogRef<CreateTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    this.teamsService.postNewTeam(this.name).subscribe(
      res => {
        this.teamsService.selectedTeam$.next(res.id);
        this.dialogRef.close();
      },
      (err: HttpErrorResponse) => {
        this.dialogRef.close();
        console.error(err);
      }
    );
  }
}

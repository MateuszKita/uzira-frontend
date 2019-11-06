import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ToastService } from '../../core/services/toast.service';
import { ToastType } from '../../models/toast.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  public toastClass: ToastType;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly toastService: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.watchSnackbarOpen();
  }

  private watchSnackbarOpen(): void {
    this.toastService.openToast$
      .subscribe(data => {
        this.toastClass = data.type;
        this.openSnackBar(data.message, data.action);
      });
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: `toast-panel-class--${this.toastClass}`
    });
  }

}

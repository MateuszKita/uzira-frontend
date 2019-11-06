import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { ToastType } from '../../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public openToast$: Subject<{ message: string, action: string, type: ToastType }> = new Subject();

  openSnackBar(message: string, type: ToastType = ToastType.SUCCESS, action?: string) {
    this.openToast$.next({message, action, type});
  }
}

import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {

  constructor(private spinner: NgxSpinnerService) {}

  start() {
    this.spinner.show();
  }

  stop() {
    this.spinner.hide();
  }
}

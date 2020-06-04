import { Injectable } from '@angular/core';
import * as alertifyjs from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() {
  }

  confirm(message: string, OkCallback: () => any) {
    alertifyjs.confirm(message, OkCallback);
  }

  success(message: string) {
    alertifyjs.success(message);
  }

  error(message: string) {
    alertifyjs.error(message);
  }

  message(message: string) {
    alertifyjs.message(message);
  }
}

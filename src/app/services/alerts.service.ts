import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {

  private alertsUpdated = new Subject<{ type: string, message: string }>();

  constructor() { }

  getAlertListener() {
    return this.alertsUpdated.asObservable();
  }

  add(type: string, message: string) {
    if (type !== 'success' && type !== 'warning' && type !== 'error' && type !== 'info') {
      return;
    }
    const alert = {
      type: type,
      message: message
    };
    this.alertsUpdated.next(alert);
  }

}

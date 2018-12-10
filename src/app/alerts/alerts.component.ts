import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../services/alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: 'alerts.component.html',
  styleUrls: ['./alerts.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {
  private alertSub: Subscription;

  successAlerts = [];
  warningAlerts = [];
  errorAlerts = [];
  infoAlerts = [];


  constructor(private alertCtrl: AlertService) { }

  ngOnInit() {
    this.alertSub = this.alertCtrl.getAlertListener()
      .subscribe(alert => {
        switch (alert.type) {
          case 'success': {
            this.successAlerts.push(alert.message);
            setTimeout(() => {
              if (this.successAlerts && this.successAlerts.length > 0) {
                  this.successAlerts.shift();
              }
            }, 5000);
            break;
          }
          case 'warning': {
            this.warningAlerts.push(alert.message);
            setTimeout(() => {
              if (this.warningAlerts && this.warningAlerts.length > 0) {
                  this.warningAlerts.shift();
              }
            }, 5000);
            break;
          }
          case 'error': {
            this.errorAlerts.push(alert.message);
            setTimeout(() => {
              if (this.errorAlerts && this.errorAlerts.length > 0) {
                  this.errorAlerts.shift();
              }
            }, 5000);
            break;
          }
          case 'info': {
            this.infoAlerts.push(alert.message);
            setTimeout(() => {
              if (this.infoAlerts && this.infoAlerts.length > 0) {
                  this.infoAlerts.shift();
              }
            }, 5000);
            break;
          }
        }
      });
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
  }

}

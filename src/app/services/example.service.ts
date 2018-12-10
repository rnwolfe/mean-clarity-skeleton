import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { ExampleSettings } from '../models/example-settings.model';

import { AlertService } from './alerts.service';

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class ExampleService {

  private settings: ExampleSettings;
  private settingsUpdated = new Subject<{ settings: ExampleSettings }>();

  constructor(private http: HttpClient, private alertCtrl: AlertService) { }

  getSettings() {
    // return this.settings;
    this.http.get<{ message: string, settings: ExampleSettings }>(BACKEND_URL + 'setting/example')
      .subscribe(
        response => {
          this.settings = response.settings;
          this.settingsUpdated.next({
            settings: this.settings
          });
        },
        error => {
          if (error.status === 500) {
            // Settings not yet defined.
            return;
          }
      });
  }

  getSettingsUpdateListener() {
    return this.settingsUpdated.asObservable();
  }

  updateSettings(id: string, server: string, port: number, username: string, password: string) {
    this.settings = {
      id: id,
      server: server,
      port: port,
      username: username,
      password: password
    };

    this.http.put<{ message: string; }>(BACKEND_URL + 'setting/example', this.settings).subscribe(response => {
      this.alertCtrl.add('success', response.message);
      console.log(response);
    });
  }
}

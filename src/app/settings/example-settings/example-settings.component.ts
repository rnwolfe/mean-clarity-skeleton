import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ExampleService } from '../../services/example.service';

import { ExampleSettings } from '../../models/example-settings.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-example-settings',
  templateUrl: './example-settings.component.html',
  styleUrls: ['./example-settings.component.css']
})
export class ExampleSettingsComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    'server': new FormControl(null, {
      validators: [Validators.required]
    }),
    'port': new FormControl(null, {
      validators: [Validators.required, Validators.min(1), Validators.max(65535)]
    }),
    'username': new FormControl(null, {
      validators: [Validators.required]
    }),
    'password': new FormControl(null, {
      validators: [Validators.required]
    })
  });

  private settings: ExampleSettings = {
    id: null,
    server: null,
    port: null,
    username: null,
    password: null
  };
  private settingsSub: Subscription;

  constructor(private example: ExampleService) { }

  ngOnInit() {
    this.example.getSettings();
    this.settingsSub = this.example.getSettingsUpdateListener()
      .subscribe((exampleSettings: { settings: ExampleSettings }) => {
        this.settings = exampleSettings.settings;
        if (this.settings.server) {
          this.form.setValue({
            'server': this.settings.server,
            'port': this.settings.port,
            'username': this.settings.username,
            'password': this.settings.password
          });
        }
      });
  }

  onSave() {
    this.example.updateSettings(
      this.settings.id,
      this.form.value.server,
      this.form.value.port,
      this.form.value.username,
      this.form.value.password
    );
  }

  ngOnDestroy() {
    this.settingsSub.unsubscribe();
  }
}

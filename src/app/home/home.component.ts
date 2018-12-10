import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../services/alerts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private alertCtrl: AlertService) { }

  ngOnInit() {
    console.log('home works!');
  }

  ngOnDestroy() {
    // win component unloads..
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

// import '@clr/icons';
// import '@clr/icons/shapes/all-shapes';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}

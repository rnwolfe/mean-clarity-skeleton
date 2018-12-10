import { Component, OnInit } from '@angular/core';
import { UserAdminService } from '../user-admin.service';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  totalUsers: number;

  private usersSub: Subscription;

  constructor(private userService: UserAdminService) { }

  ngOnInit() {
    this.userService.getUsers();
    this.usersSub = this.userService.getUserUpdateListener()
      .subscribe((userData: { users: User[], userCount: number }) => {
        this.users = userData.users;
        this.totalUsers = userData.userCount;
      });
  }

  onDelete(user: User[]) {
    this.userService.deleteUser(user['id']).subscribe(() => {
      this.userService.getUsers();
    }, () => {
      // error?
    });
  }
}

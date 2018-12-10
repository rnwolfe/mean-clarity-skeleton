import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { User } from '../../models/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + 'user/';

@Injectable({ providedIn: 'root' })
export class UserAdminService {

  private newUser: User;
  private users;
  private usersUpdated = new Subject<{ users: User[], userCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getUsers() {
    this.http
      .get<{ message: string; users: any, maxUsers: number }>(BACKEND_URL)
      .pipe(
        map((userData) => {
          return {
            users: userData.users.map(user => {
              return {
                username: user.username,
                email: user.email,
                id: user._id,
                name: user.name,
                role: user.role
              };
            }),
            maxUsers: userData.maxUsers
          };
        })
      )
      .subscribe((transformedUsersData) => {
        this.users = transformedUsersData.users;
        this.usersUpdated.next({
          users: [...this.users],
          userCount: transformedUsersData.maxUsers
        });
      });
  }

  getUser(id: string) {
    return this.http.get<{
      message: string;
      user: {
        _id: string;
        username: string;
        email: string;
        name: string;
        role: string;
      }
    }>(BACKEND_URL + id);
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  createUser(user: User) {
    console.log(user);
    return this.http
      .post(BACKEND_URL, user)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/settings/users']);
      });
  }

  updateUser(userId: string, user: User) {
    let userData: User;
    if (user.password === '!!donotchange!!') {
      userData = {
        id: userId,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        password: null
      };
    } else {
      userData = {
        id: userId,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        password: user.password
      };
    }
    this.http
      .put(BACKEND_URL + userId, userData)
      .subscribe(response => {
        this.router.navigate(['/settings/users']);
      });
  }

  deleteUser(userId: string) {
    return this.http.delete(BACKEND_URL + userId);
  }
}



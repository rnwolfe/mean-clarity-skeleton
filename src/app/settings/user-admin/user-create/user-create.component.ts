import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { UserAdminService } from '../user-admin.service';
import { User } from '../../../models/user.model';

@Component({
  templateUrl: './user-create.component.html'
})
export class UserCreateComponent implements OnInit {
  form = new FormGroup({
    'username': new FormControl(null, {
      validators: [Validators.required]
    }),
    'email': new FormControl(null, {
      validators: [Validators.required, Validators.email]
    }),
    'name': new FormControl(null),
    'role': new FormControl(null, {
      validators: [Validators.required]
    }),
    'password': new FormControl(null, {
      validators: [Validators.required]
    }),
    'confirmPassword': new FormControl(null, {
      validators: [Validators.required]
    })
  });

  user: User;
  mode = 'create';
  private userId: string;

  constructor(private userService: UserAdminService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = paramMap.get('userId');
        this.userService.getUser(this.userId).subscribe(response => {
          this.user = {
            id: response.user._id,
            username: response.user.username,
            email: response.user.email,
            name: response.user.name,
            role: response.user.role,
            password: null
          };
          this.form.setValue({
            'username': this.user.username,
            'email': this.user.email,
            'name': this.user.name,
            'role': this.user.role,
            'password': '!!donotchange!!',
            'confirmPassword': '!!donotchange!!'
          });

        });
      }
    });
  }

  onSave() {
    if (this.form.invalid) {
      console.log('Form is invalid!');
      return;
    }
    if (this.mode === 'create') {
      this.userService.createUser(this.form.value);
    } else {
      this.userService.updateUser(this.userId, this.form.value);
    }
  }
}

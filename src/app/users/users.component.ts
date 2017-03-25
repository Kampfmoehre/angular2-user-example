import { Component, OnInit } from '@angular/core';

import { UserdataService } from '../userdata.service';
import { User } from '../model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  title = 'Users View';
  users: User[];

  constructor(private userdataService: UserdataService) {}

  ngOnInit(): void {
    this.userdataService.getUsers()
      .then(users => this.users = users);
  }
}

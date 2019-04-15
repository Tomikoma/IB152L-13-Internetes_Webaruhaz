import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: User[] = [];
  private usersSub: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdateListener()
        .subscribe((users: User[]) => {
          this.users = users;
        });
  }

}

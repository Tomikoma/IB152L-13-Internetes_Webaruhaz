import { Component, OnInit } from '@angular/core';
import {User} from '../list-users/user.model';
import {Subscription} from 'rxjs';
import {UserService} from '../user.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

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

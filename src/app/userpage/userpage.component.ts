import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user.service';
import { User } from '../list-users/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit, OnDestroy {

  user: User;
  userUpdatedSub: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser();
    this.userUpdatedSub = this.userService.getUserUpdateListener()
      .subscribe(user => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.userUpdatedSub.unsubscribe();
  }

}

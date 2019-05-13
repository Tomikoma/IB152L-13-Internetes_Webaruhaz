import { Component, OnInit, OnDestroy } from '@angular/core';

import {UserService} from '../user.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  navigateTo(type: string) {
    this.router.navigateByUrl('/refresh', {skipLocationChange: true})
    .then(() => this.router.navigate(['/products/' + type]));
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}

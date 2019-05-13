import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import {User} from './list-users/user.model';

@Injectable({providedIn: 'root'})
export class UserService {

  user: User;
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();
  private userUpdated = new Subject<User>();

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http.get<{message: string, users: any}>('http://localhost:3000/api/users')
      .subscribe((usersData) => {
        // console.log(usersData.users);
        this.users = usersData.users;
        this.usersUpdated.next([...this.users]);
      });
  }

  getUser() {
    this.http.get<{user: any}>('http://localhost:3000/api/user/info')
      .subscribe(userData => {
        this.user = userData.user;
        this.userUpdated.next({...this.user});
      });
  }

  setBalance(amount: number) {
    this.http.post('http://localhost:3000/api/user/balance', {amount})
      .subscribe(response => {
        console.log(response);
      });
  }

  getUsersUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }
}

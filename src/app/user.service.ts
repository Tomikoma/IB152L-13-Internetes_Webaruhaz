import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import {User} from './list-users/user.model';

@Injectable({providedIn: 'root'})
export class UserService {

  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http.get<{message: string, users: any}>('http://localhost:3000/api/users')
      .subscribe((usersData) => {
        // console.log(usersData.users);
        this.users = usersData.users;
        this.usersUpdated.next([...this.users]);
      });
  }

  getUsersUpdateListener(){
    return this.usersUpdated.asObservable();
  }
}

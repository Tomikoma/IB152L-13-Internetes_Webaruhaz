import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

// tslint:disable-next-line: max-line-length
  createUser(email: string, password: string, name: string, phoneNumber: number, postalCode: number, city: string, street: string, streetNumber: number) {
    //console.log(email,password,name,phoneNumber,postalCode,city,street,streetNumber);
    this.http.post('http://localhost:3000/api/user/signup', {email, password, name, phoneNumber, postalCode, city, street, streetNumber})
      .subscribe(response => {
        console.log(response);
      });
  }


  login(email: string, password: string) {
    const authData = {email, password};
    this.http.post<{token: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        console.log(response);
        this.authStatusListener.next(true);
      });
  }
}


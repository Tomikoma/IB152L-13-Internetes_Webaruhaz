import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm)  {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email,
      form.value.password,
      form.value.name,
      form.value.phoneNumber,
      form.value.postalCode,
      form.value.city,
      form.value.street,
      form.value.streetNumber
      );
    this.router.navigate(['']);
  }
}

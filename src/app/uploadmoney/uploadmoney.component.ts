import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../user.service';



/**
 * @title Stepper overview
 */
@Component({
  selector: 'app-uploadmoney',
  templateUrl: './uploadmoney.component.html',
  styleUrls: ['./uploadmoney.component.css']
})
export class UploadmoneyComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selected: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  addMoneyToAccount(amount: number) {
    if (!amount) {
      return;
    }
    this.userService.setBalance(amount);
  }
}

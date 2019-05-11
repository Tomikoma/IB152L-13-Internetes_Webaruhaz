import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  addMoneyToAccount() {
    return;
  }
}

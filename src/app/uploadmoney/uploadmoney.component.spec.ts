import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadmoneyComponent } from './uploadmoney.component';

describe('UploadmoneyComponent', () => {
  let component: UploadmoneyComponent;
  let fixture: ComponentFixture<UploadmoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadmoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewproductsComponent } from './newproducts.component';

describe('NewproductsComponent', () => {
  let component: NewproductsComponent;
  let fixture: ComponentFixture<NewproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

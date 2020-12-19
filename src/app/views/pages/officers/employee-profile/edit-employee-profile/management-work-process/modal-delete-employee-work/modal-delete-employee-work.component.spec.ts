import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteEmployeeWorkComponent } from './modal-delete-employee-work.component';

describe('ModalDeleteEmployeeWorkComponent', () => {
  let component: ModalDeleteEmployeeWorkComponent;
  let fixture: ComponentFixture<ModalDeleteEmployeeWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteEmployeeWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteEmployeeWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

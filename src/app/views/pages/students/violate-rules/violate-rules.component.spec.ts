import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolateRulesComponent } from './violate-rules.component';

describe('ViolateRulesComponent', () => {
  let component: ViolateRulesComponent;
  let fixture: ComponentFixture<ViolateRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolateRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolateRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

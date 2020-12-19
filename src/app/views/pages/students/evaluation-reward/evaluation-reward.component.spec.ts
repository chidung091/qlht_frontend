import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationRewardComponent } from './evaluation-reward.component';

describe('EvaluationRewardComponent', () => {
  let component: EvaluationRewardComponent;
  let fixture: ComponentFixture<EvaluationRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {AllCategoriesRequested, Category, getCate, getCateLoaded} from '../../../../../../core/category';
import {select, Store} from '@ngrx/store';
import {CategoryType} from '../../../../../../core/_constants';
import {map, takeUntil} from 'rxjs/operators';
import {NgUnsubscribe} from '../../../../../shared/directives';
import {getAllPublicServant, GetAllPublicServantCategory, PublicServantModel} from '../../../../../../core/common';
import {RegexValidators} from '../../../../../../core/_constants/regex';

@Component({
  selector: 'kt-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent extends NgUnsubscribe implements OnInit {

  @Input() form: FormGroup
  @Input() submitStatus: boolean
  defaultDropdown = {cateCode: null, cateName: 'Lựa chọn'}
  maxDate = new Date();

  ngachHang$: Observable<PublicServantModel[]>
  public loadingNgachHang$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _2$: Observable<Category[]>
  _2Loaded$: Observable<boolean>

  constructor(
    private store: Store,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.selectStore();

  }

  initForm() {
    this.form.addControl('employeeScale', new FormControl(''))
    this.form.addControl('salaryLevel', new FormControl(''))
    this.form.addControl('employeeScaleCode', new FormControl(''))
    this.form.addControl('employeeScaleName', new FormControl(''))
    this.form.addControl('isFostering', new FormControl(false,[]))
    this.form.addControl('coefficient', new FormControl('',[ Validators.maxLength(50),Validators.pattern(RegexValidators.decimalMax100)]))
    this.form.addControl('seniorityAllowances', new FormControl('',[ Validators.maxLength(50),Validators.pattern(RegexValidators.decimalMax100)]))
    this.form.addControl('salaryAmount', new FormControl('',[ Validators.maxLength(50),Validators.pattern(RegexValidators.decimalMax100)]))
    this.form.addControl('vocationalAllowance', new FormControl('',[ Validators.maxLength(50),Validators.pattern(RegexValidators.decimalMax100)]))
    this.form.addControl('preferentialAllowance', new FormControl('',[ Validators.maxLength(50),Validators.pattern(RegexValidators.decimalMax100)]))
    this.form.addControl('prefrentialAllowLeadership', new FormControl('',[ Validators.maxLength(50),Validators.pattern(RegexValidators.decimalMax100)]))
    this.form.addControl('appliedDate', new FormControl('',[]))
  }

  selectStore() {
    this.ngachHang$ = this.store.pipe(select(getAllPublicServant));
    this.ngachHang$.subscribe((data) => {
      if (!data) {
        this.loadingNgachHang$.next(true);
        this.store.dispatch(new GetAllPublicServantCategory());
      } else {
        this.loadingNgachHang$.next(false);
      }
    })

    this._2$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(getCate, CategoryType.DM_BAC_LUONG))
    this._2Loaded$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(getCateLoaded, CategoryType.DM_BAC_LUONG), map(value => !value))
    this._2$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_BAC_LUONG}))
      }
    })
  }
  setName(value,name){
    this.form.get(name).setValue(value.cateName)
  }
}

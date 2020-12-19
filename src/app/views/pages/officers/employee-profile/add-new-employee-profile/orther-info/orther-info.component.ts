import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {AllCategoriesRequested, Category, getCate, ListCateCode} from '../../../../../../core/category';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../../../core/reducers';
import {takeUntil} from 'rxjs/operators';
import {NgUnsubscribe} from '../../../../../shared/directives';
import {RegexValidators} from '../../../../../../core/_constants/regex';

@Component({
  selector: 'kt-orther-info',
  templateUrl: './orther-info.component.html',
  styleUrls: ['./orther-info.component.scss']
})
export class OrtherInfoComponent extends NgUnsubscribe implements OnInit {

  @Input() form: FormGroup;
  maxDate = new Date();
  nowDate: Date = new Date();
  defaultDropdown = {cateCode: null, cateName: 'Lựa chọn'}

  //region default checkbox
  isYouthLeageMember = false;
  isCommunistPartyMember = false;
  isTradeUnion = false;
  //endregion

  //region Select store
  concurrentSubject$: Observable<Category[]>
  maritalStatus$: Observable<Category[]>
  //endregion Select store

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.initStore();
  }

  initForm() {
    this.form.addControl('concurrentSubjectCode', new FormControl(null));

    this.form.addControl('familyTypeCode', new FormControl(null));

    this.form.addControl('otherNote', new FormControl(null,
      [Validators.maxLength(250)]));

    this.form.addControl('mariageStatusCode', new FormControl(null));

    this.form.addControl('isYouthLeageMember', new FormControl(this.isYouthLeageMember));

    this.form.addControl('youthLeageJoinDate', new FormControl({value: null, disabled: !this.isYouthLeageMember},[Validators.required]));

    this.form.addControl('youthLeageJoinPlace', new FormControl({value: null, disabled: !this.isYouthLeageMember},[Validators.required,Validators.maxLength(250)]));

    this.form.addControl('isCommunistPartyMember', new FormControl(this.isCommunistPartyMember));

    this.form.addControl('partyJoinedDate', new FormControl({value: null, disabled: !this.isCommunistPartyMember},[Validators.required]));

    this.form.addControl('partyJoinedPlace', new FormControl({value: null, disabled: !this.isCommunistPartyMember},[Validators.required,Validators.maxLength(250)]));

    this.form.addControl('isTradeUnion', new FormControl(this.isTradeUnion));

    this.form.addControl('tradeUnionJoinedDate', new FormControl({value: null, disabled: !this.isTradeUnion}));

    this.form.addControl('insuranceNumber', new FormControl(null,[Validators.pattern(RegexValidators.onlyNumberAndLetters),Validators.maxLength(50)]));

    this.form.addControl('fatherFullName', new FormControl(null,
      [Validators.maxLength(50)]));

    this.form.addControl('fatherBirthDate', new FormControl(null,
      [Validators.maxLength(4),Validators.pattern(RegexValidators.number)]));

    this.form.addControl('fatherJob', new FormControl(null,
      [Validators.maxLength(250)]));

    this.form.addControl('fatherWorkingPlace', new FormControl(null,
      [Validators.maxLength(250)]));

    this.form.addControl('motherFullName', new FormControl(null,
      [Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9]+$')]));

    this.form.addControl('motherBirthDate', new FormControl(null,
      [Validators.maxLength(4),Validators.pattern(RegexValidators.number)]));

    this.form.addControl('motherJob', new FormControl(null,
      [Validators.maxLength(250)]));

    this.form.addControl('motherWorkingPlace', new FormControl(null,
      [Validators.maxLength(250)]));

    this.form.addControl('spouseFullName', new FormControl(null,
      [Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9]+$')]));

    this.form.addControl('spouseBirthDate', new FormControl(null,
      [Validators.maxLength(4),Validators.pattern(RegexValidators.number)]));

    this.form.addControl('spouseJob', new FormControl(null,
      [Validators.maxLength(250)]));

    this.form.addControl('spouseWorkingPlace', new FormControl(null,
      [Validators.maxLength(250)]));

    this.form.addControl('isRegularRefresher', new FormControl(false));

    this.form.addControl('isTeacherDuties', new FormControl(false));

    this.form.addControl('isMotelRoomOutsite', new FormControl(false));

    this.form.addControl('isNeedTeacherDuties', new FormControl(false));
  }

  initStore() {
    this.concurrentSubject$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(getCate, ListCateCode.dmMonHoc));
    this.maritalStatus$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(getCate, ListCateCode.dmTTHonNhan));


    this.concurrentSubject$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmMonHoc}))
      }
    })

    this.maritalStatus$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: ListCateCode.dmTTHonNhan}))
      }
    })
  }

  changeCheckbox(formName: string) {
    switch (formName) {
      case 'isTradeUnion':
        this.isTradeUnion = !this.isTradeUnion;
        if (this.isTradeUnion) {
          this.form.get('tradeUnionJoinedDate').enable();
        } else {
          this.form.get('tradeUnionJoinedDate').disable();
        }
        break;
      case 'isCommunistPartyMember':
        this.isCommunistPartyMember = !this.isCommunistPartyMember;
        if (this.isCommunistPartyMember) {
          this.form.get('partyJoinedDate').enable();
          this.form.get('partyJoinedPlace').enable();
        } else {
          this.form.get('partyJoinedDate').disable();
          this.form.get('partyJoinedPlace').disable();
        }
        break;
      case 'isYouthLeageMember':
        this.isYouthLeageMember = !this.isYouthLeageMember;
        if (this.isYouthLeageMember) {
          this.form.get('youthLeageJoinDate').enable();
          this.form.get('youthLeageJoinPlace').enable();
        } else {
          this.form.get('youthLeageJoinDate').disable();
          this.form.get('youthLeageJoinPlace').disable();
        }
    }
  }

}

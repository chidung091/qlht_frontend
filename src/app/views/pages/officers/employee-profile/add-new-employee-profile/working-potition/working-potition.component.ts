import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgUnsubscribe} from '../../../../../shared/directives';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AllCategoriesRequested, Category, getCate, getCateLoaded} from '../../../../../../core/category';
import {CategoryType} from '../../../../../../core/_constants';
import {takeUntil} from 'rxjs/operators';
import {RegexValidators} from '../../../../../../core/_constants/regex';
import {locale} from '../../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-working-potition',
  templateUrl: './working-potition.component.html',
  styleUrls: ['./working-potition.component.scss']
})
export class WorkingPotitionComponent extends NgUnsubscribe implements OnInit {
  VI_LANG = locale.data;
  @Input() form: FormGroup;
  @Input() submitStatus: boolean
  maxDate = new Date();
  public nowDate: Date = new Date();
  defaultDropdown = {cateCode: null, cateName: 'Lựa chọn'}

  mission$: Observable<Category[]>
  missionLoaded$: Observable<boolean>
  periodsPerDay$: Observable<Category[]>
  periodsPerDayLoaded$: Observable<boolean>
  periodsPerDay = [
    {cateName: 'Dạy 1 buổi/ngày', cateCode: 1},
    {cateName: 'Dạy 2 buổi/ngày', cateCode: 2},
  ]

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
    this.form.addControl('concurrentWorkCode', new FormControl(null));
    this.form.addControl('concurrentWorkName', new FormControl(null));
    this.form.addControl('sectionPerDay', new FormControl(null,[Validators.pattern(RegexValidators.number)]));
    this.form.addControl('recruitmentDate', new FormControl(null,[]));
    this.form.addControl('coHourPerWeek', new FormControl(null,[Validators.maxLength(2),Validators.pattern(RegexValidators.number)]));
    this.form.addControl('recruitmentAgency', new FormControl(null,[Validators.maxLength(50)]));
    this.form.addControl('careerJoinDate', new FormControl(null,[]));
    this.form.addControl('foreignLanguageRecruitment', new FormControl(null,[Validators.maxLength(50)]));
    this.form.addControl('sectionPerWeek', new FormControl(null,[Validators.maxLength(2),Validators.pattern(RegexValidators.number)]));
    this.form.addControl('isSoftSkillTrained', new FormControl(false));
    this.form.addControl('isDedicatedForYouthLeage', new FormControl(false));
    this.form.addControl('isTeachStudentDisability', new FormControl(false));
  }

  selectStore() {
    this.mission$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(getCate, CategoryType.DM_NHIEM_VU_KIEM_NHIEM))
    this.missionLoaded$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(getCateLoaded, CategoryType.DM_NHIEM_VU_KIEM_NHIEM))
    this.mission$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_NHIEM_VU_KIEM_NHIEM}))
      }
    })
    // this.periodsPerDay$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(getCate, CategoryType.DM_NHIEM_VU_KIEM_NHIEM))
    // this.periodsPerDayLoaded$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(getCateLoaded, CategoryType.DM_NHIEM_VU_KIEM_NHIEM))
    // this.periodsPerDay$.subscribe(value => {
    //   if (!value) {
    //     this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_NHIEM_VU_KIEM_NHIEM}))
    //   }
    // })
  }


  cateSelected(value, name) {
    this.form.get(name).setValue(value.cateName)
  }
}

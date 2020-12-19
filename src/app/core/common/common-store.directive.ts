import {NgUnsubscribe} from '../../views/shared/directives';
import {Directive, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SchoolFacultyModel} from './model/school-faculty.model';
import {select, Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';
import {getAllSchoolFaculty, isAllSchoolFacultyLoaded} from './common.selectors';
import {GetAllSchoolFaculty} from './common.action';
import {AppState} from '../reducers';
import {SmasContextService} from '../_base/layout';
import {Category, GetCategoriesWithParent, getCateWithParent, getCateWithParentLoaded} from '../category';
import {CategoryType} from '../_constants';
import {SmasConText} from '../_base/layout/models/smas-context.model';

@Directive({
  selector: '[commonBase]'
})
export class CommonStore extends NgUnsubscribe {

  // Tổ bộ môn
  schoolFaculty$: Observable<SchoolFacultyModel[]>;
  schoolFacultyLoaded$: Observable<boolean>;


  // Khối
  grade$: Observable<Category[]>;
  gradeLoaded$: Observable<boolean>;



  constructor(
    public store: Store<AppState>,
  ) {
    super();
    this.initStore();
  }

  initStore() {
    this.schoolFaculty$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(getAllSchoolFaculty))
    this.schoolFacultyLoaded$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(isAllSchoolFacultyLoaded))
    this.schoolFaculty$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if (!value) {
        this.store.dispatch(new GetAllSchoolFaculty())
      }
    })

    this.grade$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(getCateWithParent, CategoryType.DM_KHOI));
    this.gradeLoaded$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(getCateWithParentLoaded, CategoryType.DM_KHOI));

    this.grade$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if (!value) {
        const smasContext = JSON.parse(sessionStorage.getItem('smasConText'));
        this.store.dispatch(new GetCategoriesWithParent({
          cateCode: CategoryType.DM_KHOI,
          cateParentCode: smasContext.level.schoolLevelCode
        }))
      }
    })
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../../core/reducers';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { SchoolLevel, TenantInfo } from '../../../core/auth/_models';
import { Category } from '../../../core/category';
import {
  currentTenant,
  selectSchoolLevels,
} from '../../../core/auth/_selectors/tenant.selectors';
import { SmasContextService } from '../../../core/_base/layout';
import { isConfigLoaded, Logout } from '../../../core/auth';
import { takeUntil } from 'rxjs/operators';
import { selectGrantedPolicies } from 'src/app/core/auth/_selectors/config.selectors';
import { NotificationService } from '@progress/kendo-angular-notification';
import { LevelSelector, YearSelector } from '../../../core/year-level-selector';
import { SmasConText } from '../../../core/_base/layout/models/smas-context.model';

@Component({
  selector: 'kt-level-school',
  templateUrl: './level-school.component.html',
  styleUrls: ['./level-school.component.scss'],
})
export class LevelSchoolComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  isLoading$: Observable<boolean>;

  levels$: Observable<SchoolLevel[]>;

  grantedPolicies$: Observable<any>;

  error$: Observable<boolean>;

  currentTenant: TenantInfo;

  smasContextModel: SmasConText = new SmasConText();

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private smasContext: SmasContextService,
    private notificationService: NotificationService
  ) {
    this.isLoading$ = this.store.pipe(takeUntil(this.destroy$), select(isConfigLoaded));
    this.store.pipe(takeUntil(this.destroy$), select(currentTenant)).subscribe(tenant =>  this.currentTenant = tenant);
  }

  ngOnInit(): void {
    this.levels$ = this.store.pipe(
      takeUntil(this.destroy$),
      select(selectSchoolLevels)
    );
    this.grantedPolicies$ = this.store.pipe(
      takeUntil(this.destroy$),
      select(selectGrantedPolicies)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectLevel(level: SchoolLevel): void {
    this.smasContextModel.level = level;
    this.smasContext.setSmasConText(this.smasContextModel, true);
    if(this.currentTenant.isFirstLogin){
      this.router.navigate(['system/data-initialization']);
    } else {
      this.router.navigate(['']);
    }
  }

  notify(): void {
    this.notificationService.show({
      content: 'Tài khoản của bạn chưa được phân quyền!',
      type: { style: 'warning', icon: true},
      hideAfter: 2000,
      position: { horizontal: 'right', vertical: 'bottom' },
      animation: { type: 'fade', duration: 400 },
      cssClass: 'p-5 mb-5 mr-5 border-radius'
    })
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}

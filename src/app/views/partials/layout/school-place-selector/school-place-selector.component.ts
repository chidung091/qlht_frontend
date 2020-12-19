import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppState } from '../../../../core/reducers';
import { Place, TenantInfo } from '../../../../core/auth/_models';
import { SmasContextService } from '../../../../core/_base/layout';
import { takeUntil } from 'rxjs/operators';
import { currentTenant, selectSchoolPlaces } from '../../../../core/auth/_selectors/tenant.selectors';
import { each } from 'lodash';
import { SmasConText } from '../../../../core/_base/layout/models/smas-context.model';
import { NgUnsubscribe } from '../../../../views/shared/directives';

@Component({
  selector: 'kt-school-place-selector',
  templateUrl: './school-place-selector.component.html',
  styleUrls: ['./school-place-selector.component.scss']
})
export class SchoolPlaceSelectorComponent extends NgUnsubscribe implements OnInit {

  places$: Observable<Place[]>;

  tenant$: Observable<TenantInfo>;

  selected$ = new BehaviorSubject<Place>(null);

  smasContextModel: SmasConText  = new SmasConText();

  isDisableDropdown: boolean;

  constructor(
    private store: Store<AppState>,
    private smasContextService: SmasContextService
  ) {
    super()
    this.smasContextService.onConfigUpdated$.subscribe(ctx => {
      this.smasContextModel = this.smasContextService.getSmasConText();
    });
   }

  ngOnInit(): void {
    this.places$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(selectSchoolPlaces));
    this.tenant$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(currentTenant));
    this.places$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(places => {
      this.isDisableDropdown = places.length === 1;
      each(places, p => {
        if(p.primary){
          this.smasContextModel.place = p;
          this.smasContextService.setSmasConText(this.smasContextModel, true);
        }
      })
    })
  }

  selectPlace(place: Place): void {
    this.smasContextModel.place = place;
    this.smasContextService.setSmasConText(this.smasContextModel, true);
  }
}

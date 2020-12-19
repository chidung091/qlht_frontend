import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {SchoolLevel} from '../../../../core/auth/_models';
import {NgUnsubscribe} from '../../../shared/directives/ng-unsubscribe.directive';
import {selectSchoolLevels} from '../../../../core/auth';
import {AppState} from '../../../../core/reducers';
import {currentYear, schoolYears, Year} from '../../../../core/year';
import {SmasContextService} from '../../../../core/_base/layout';
import {takeUntil} from 'rxjs/operators';
import {FilterYearAndLevel} from '../../../../core/_dtos/filter.dto';
import { SmasConText } from '../../../../core/_base/layout/models/smas-context.model';

@Component({
  selector: 'kt-year-level-selector',
  templateUrl: './year-level-selector.component.html',
  styleUrls: ['./year-level-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearLevelSelectorComponent extends NgUnsubscribe implements OnInit, OnChanges {

  newSelected: FilterYearAndLevel = {
    level: undefined,
    year: undefined
  };

  @Input() filter: FilterYearAndLevel;
  @Input() selected: FilterYearAndLevel;
  @Output() valueChanged = new EventEmitter<FilterYearAndLevel>();


  years$: Observable<Year[]>;
  levels$: Observable<SchoolLevel[]>;

  currentYear$: Observable<Year>;
  smasContextModel: SmasConText  = new SmasConText();


  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private smasContextService: SmasContextService
  ) {
    super();
    this.smasContextService.onConfigUpdated$.subscribe(ctx => {
      this.smasContextModel = this.smasContextService.getSmasConText();
    });
    this.years$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(schoolYears));
    this.levels$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(selectSchoolLevels));
    this.currentYear$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(currentYear));


  }

  ngOnInit(): void {
    this.currentYear$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((current: Year) => {
      if(current) {
        this.smasContextModel.year = current;
        this.smasContextService.setSmasConText(this.smasContextModel, true, false, true);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    const selected: FilterYearAndLevel = changes?.selected.currentValue;
    if (selected) {
      // this.newSelected.year = selected.year;
      // this.newSelected.level = selected.level;
    }
  }

  selectYear(year: Year) {
    this.smasContextModel.year = year
    this.smasContextService.setSmasConText(this.smasContextModel, true, false , true);
    // this.smasContext.setYear(year);
    // this.newSelected.year = year;
    // this.valueChanged.emit(this.newSelected);
  }

  selectLevel(level: SchoolLevel) {
    this.smasContextModel.level = level
    this.smasContextService.setSmasConText(this.smasContextModel, true, true);
    // this.smasContext.setLevel(level);
    // this.newSelected.level = level;
    // this.valueChanged.emit(this.newSelected);
  }

  // getValue(): FilterYearAndLevel {
  //   return this.newSelected;
  // }
}

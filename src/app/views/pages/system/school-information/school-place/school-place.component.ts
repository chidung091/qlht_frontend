import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../../core/reducers';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {SchoolPlaces} from '../../../../../core/auth/_models';
import {getFullSchoolPlace} from '../../../../../core/auth/_selectors/tenant.selectors';
import {takeUntil} from 'rxjs/operators';
import {PageChangeEvent} from '@progress/kendo-angular-grid';
import {Policies} from '../../../../../core/_constants/policy.constants';
import {SchoolInformationModel} from '../../../../../core/service/model/school-information.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActionComponent} from './action/action.component';
import {DeleteComponent} from './delete/delete.component';
import {locale} from "../../../../../core/_config/i18n/vi";

@Component({
  selector: 'kt-school-place',
  templateUrl: './school-place.component.html',
  styleUrls: ['./school-place.component.scss'],
})
export class SchoolPlaceComponent implements OnInit, OnDestroy {
  VI_LANG = locale.data;
  destroy$ = new Subject<void>();
  schoolPlaces$: Observable<SchoolPlaces[]>;
  schoolPlacesView: SchoolPlaces[];
  loading$ = new BehaviorSubject<boolean>(false);
  collapse: boolean;
  showLoading: boolean;
  mySelection: string[] = [];

  roleCreateSubSchool = Policies.SCHOOLMANAGEMENT_SCHOOLSUBSIDIARY_CREATE;
  roleEditSubSchool = Policies.SCHOOLMANAGEMENT_SCHOOLSUBSIDIARY_EDIT;
  roleDeleteSubSchool = Policies.SCHOOLMANAGEMENT_SCHOOLSUBSIDIARY_DELETE;

  checkDeleteAll = true;
  dataItem: SchoolInformationModel;

  public pageSize = 5;
  public skip = 0;

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.schoolPlaces$ = this.store.pipe(
      takeUntil(this.destroy$),
      select(getFullSchoolPlace));
    this.schoolPlaces$.subscribe(value => {
      if (value) this.schoolPlacesView = value
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  openModalAdd() {
    const modalRef = this.modalService.open(ActionComponent, {
      size: 'lg',
      centered: true,
    })
    // modalRef.componentInstance.data = 'Pass data'
  }

  openModalDelete() {
    const modalRef = this.modalService.open(DeleteComponent, {
      size: '400px',
      centered: true,
    })
    modalRef.componentInstance.data = this.mySelection;
  }

  openModalEdit(data: any) {
    const modalRef = this.modalService.open(ActionComponent, {
      size: 'lg',
      centered: true,
    })
    modalRef.componentInstance.data = data;
  }

  private loadItems(): void {
    this.schoolPlacesView.slice(this.skip, this.skip + this.pageSize);
  }

  onChange(row: any) {
    this.mySelection = row;
    this.checkDeleteAll = this.mySelection.length <= 0;
  }
}

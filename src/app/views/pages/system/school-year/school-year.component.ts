import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngrx/store';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppState} from '../../../../core/reducers';
import {ItemSchoolYearModel} from 'src/app/core/service/model/item-school-year.model';
import {SchoolYear} from '../../../../core/service/model/school-year.model';
import {NotiService} from '../../../../core/service/service-model/notification.service';
import {SchoolYearService} from '../../../../core/service/service-model/school-year.service';
import {ModalAddEditComponent} from './modal-add-edit/modal-add-edit.component';
import {locale} from '../../../../core/_config/i18n/vi'
import { GridSettings } from '../../../../core/_interfaces';
import { columnsOrder } from './columns';
import { HelperService } from '../../../../core/_helpers/helper.service';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'kt-school-year',
  templateUrl: './school-year.component.html',
  styleUrls: ['./school-year.component.scss'],
})
export class SchoolYearComponent implements OnInit {
  VI_LANG = locale.data;
  listSchoolYear: Observable<SchoolYear[]>;
  public gridView: GridDataResult;
  public getData: ItemSchoolYearModel;
  public pageSize = 10;
  public skip = 0;
  isloading = true;
  ADD = 'ADD';
  UPDATE = 'UPDATE';
  DELETE = 'DELETE';
  // openRemove = false;
  isDisabled = false;
  delete = false;
  open = false;
  item: SchoolYear;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public mySelection: string[] = [];
  pageSizes: Array<number> = [10, 20, 50];
  _pageSize = 10;
  rowsSelected: number[];
  checkDeleteAll = true;

  @ViewChild(TooltipDirective, { static: true }) tooltipDir: TooltipDirective;
  @ViewChild('grid', { static: true }) grid;
  gridSettings: GridSettings = {
    date: null,
    state: {
      skip: 0,
      take: 10,
      filter: {
        logic: 'and',
        filters: []
      }
    },
    gridData: {
      filter: {
        logic: 'and',
        filters: []
      }
    },
    columnMenu: true,
    columnsConfig: JSON.parse(JSON.stringify(columnsOrder))
  };

  data: any;
  type = 'numeric';

  constructor(
    public helperService: HelperService,
    private schoolYearService: SchoolYearService,
    public modal: NgbModal,
    private notiService: NotiService
  ) {}

  ngOnInit(): void {
    this.fetchAll();
  }

  fetchAll() {
    this.isloading = true;
    this.schoolYearService.getAllSchoolYear().subscribe(item => {
      this.getData = item;
      this.data = item;
      this.loadItems();
      this.isloading = false;
      this.isLoading$.next(true);
    }, () => {
      this.isloading = false;
    })
    // this.openRemove = false

  }

  openModalEdit(dataItem: any) {
    const modalRef = this.modal.open(ModalAddEditComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.actionType = this.UPDATE;
    modalRef.componentInstance.title = 'Cập nhật năm học';
    modalRef.componentInstance.selectedItem = dataItem;
    modalRef.result.then(data => {
      if (data === 'Thành công') {
        this.fetchAll();
        this.notiService.updateSuccess();
      }
    }).catch((error) => error);
  }

  close() {
    // this.openRemove = false;
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.fetchAll();
  }

  dataStateChange(state: DataStateChangeEvent) {
    this.gridSettings.state = state;
    this.gridSettings.gridData = process(this.data, state);
  }

  loadItems() {
    this.gridSettings.gridData = process(this.data, this.gridSettings.state);
    this.gridSettings.date = new Date();
  }

}

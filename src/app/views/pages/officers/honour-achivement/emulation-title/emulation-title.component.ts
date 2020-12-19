import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {SmasConText} from 'src/app/core/_base/layout/models/smas-context.model';
import {SmasContextService} from 'src/app/core/_base/layout/services/smas-context.service';
import {HonourAchivementService} from '../honour-achivement-sevice/honour-achivement.service';
import {AddEmulationTitleComponent} from './add-emulation-title/add-emulation-title.component';
import {DeleteEmulationTitleComponent} from './delete-emulation-title/delete-emulation-title.component';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/core/reducers';
import {CommonStore} from 'src/app/core/common';

@Component({
  selector: 'kt-emulation-title',
  templateUrl: './emulation-title.component.html',
  styleUrls: ['./emulation-title.component.scss']
})
export class EmulationTitleComponent extends CommonStore implements OnInit {
  checkYearDisabled = false;
  isCollapsed: boolean = false;
  loading: boolean = false;
  disableBtnDele: boolean = true;
  public defaultListSubjects: { id: string, facultyName: string } = {facultyName: 'Tất cả', id: null};
  destroy$ = new Subject<void>();
  schoolYearCode: string;
  schoolYearId: string;
  idToBoMon: string;
  _pageSize = 10;
  pageSizes: Array<number> = [10, 20, 50, 100];
  public skip = 0;
  gridView: GridDataResult;
  dataFilter: SmasConText;
  public mySelection: string[] = [];

  constructor(
    private modal: NgbModal,
    private smasContextService: SmasContextService,
    private api: HonourAchivementService,
    private cdRef: ChangeDetectorRef,
    private toastr: ToastrService,
    public store: Store<AppState>,
  ) {
    super(store);
    this.smasContextService.onConfigUpdated$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.dataFilter = this.smasContextService.getSmasConText();
      if (this.dataFilter.year) {
        if (this.dataFilter.year && this.dataFilter.year.currentYear === false) {
          this.checkYearDisabled = true;
          this.disableBtnDele = true;
        } else {
          this.checkYearDisabled = false;
        }
        this.getAllData();
      }
    });
  }

  ngOnInit(): void {
    this.dataFilter = this.smasContextService.getSmasConText();
    if (this.dataFilter.year) {
      if (this.dataFilter.year && this.dataFilter.year.currentYear === false) {
        this.checkYearDisabled = true;
        this.disableBtnDele = true;
      } else {
        this.checkYearDisabled = false;
      }
    }
    this.getAllData();
  }

  getAllData() {
    let input = {
      sort: 'creationTime',
      sortDirection: 1,
      filterItems: [],
      searchText: '',
      skipCount: this.skip,
      maxResultCount: this._pageSize
    }
    if (this.idToBoMon) {
      input.filterItems.push({propertyName: 'facultyId', comparison: 0, value: this.idToBoMon});
    }
    if (this.dataFilter) {
      input.filterItems.push({propertyName: 'schoolYear', comparison: 0, value: this.dataFilter.year.code});
    }
    this.loading = true;
    this.api.GetAllCb(input)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe(data => {
        this.gridView = ({
          data: data.items,
          total: data.totalCount
        });
      }, error => {
        this.loading = false;
      })
  }

  search() {
    this.skip = 0;
    this.getAllData();
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.getAllData();
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.getAllData();
  }

  onChange(row) {
    this.mySelection = row;
    if (this.mySelection.length > 0) {
      this.disableBtnDele = false;
    } else {
      this.disableBtnDele = true;
    }
  }

  openDelete() {
    const modalRef = this.modal.open(DeleteEmulationTitleComponent, {size: 'md', centered: true});
    modalRef.componentInstance.listIds = this.mySelection;
    modalRef.componentInstance.title = 'Xóa danh hiệu thi đua';
    modalRef.result.then(data => {
      if (data === 'ok') {
        this.skip = 0;
        this.getAllData();
        this.mySelection = [];
        this.disableBtnDele = true;
      }
    }).catch(error => error);
  }

  openModalCreate() {
    if (this.dataFilter === undefined || this.dataFilter.year === undefined) {
      this.toastr.warning('Hãy chọn năm!');
      return
    }
    // if (!this.listOfficer || this.listOfficer.length < 1) {
    //   this.toastr.warning('Hãy thêm cán bộ!');
    //   return
    // }

    const modalRef = this.modal.open(AddEmulationTitleComponent, {size: 'md', centered: true});
    modalRef.componentInstance.title = 'Thêm danh hiệu thi đua';
    modalRef.componentInstance.schoolYearCode = this.dataFilter.year.code;
    modalRef.componentInstance.schoolYearId = this.dataFilter.year.id;
    modalRef.result.then(r => {
      if (r) {
        this.skip = 0;
        this.getAllData();
      }
    }).catch(error => error);
  }

  openEdit(idDHTHD) {
    if (this.dataFilter === undefined || this.dataFilter.year === undefined) {
      this.toastr.warning('Hãy chọn năm!');
      return
    }
    const modalRef = this.modal.open(AddEmulationTitleComponent, {size: 'md', centered: true});
    modalRef.componentInstance.title = 'Cập nhật danh hiệu thi đua';
    modalRef.componentInstance.idDHTHD = idDHTHD;
    modalRef.result.then(r => {
      if (r) {
        this.getAllData();
      }
    }).catch(error => error);
  }


}

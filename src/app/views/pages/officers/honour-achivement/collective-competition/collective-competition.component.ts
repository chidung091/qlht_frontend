import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngrx/store';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {CommonStore} from 'src/app/core/common';
import {AppState} from 'src/app/core/reducers';
import {SmasConText} from 'src/app/core/_base/layout/models/smas-context.model';
import {SmasContextService} from 'src/app/core/_base/layout/services/smas-context.service';
import {HonourAchivementService} from '../honour-achivement-sevice/honour-achivement.service';
import {AddCollectiveCompetitionComponent} from './add-collective-competition/add-collective-competition.component';
import {DeleteCollectiveCompetitionComponent} from './delete-collective-competition/delete-collective-competition.component';

@Component({
  selector: 'kt-collective-competition',
  templateUrl: './collective-competition.component.html',
  styleUrls: ['./collective-competition.component.scss']
})
export class CollectiveCompetitionComponent extends CommonStore implements OnInit {
  checkYearDisabled = false;
  isCollapsed = false;
  loading = false;
  public defaultListSubjects: { id: string, facultyName: string } = {facultyName: 'Tất cả', id: null};
  idToBoMon: string;
  _pageSize = 10;
  pageSizes: Array<number> = [10, 20, 50, 100];
  public skip = 0;
  gridView: GridDataResult;
  disableBtnDele = true;
  destroy$ = new Subject<void>();
  schoolYearcode: string;
  schoolYearId: string;
  public mySelection: string[] = [];
  dataFilter: SmasConText;

  constructor(
    private modal: NgbModal,
    private api: HonourAchivementService,
    private cdRef: ChangeDetectorRef,
    private smasContextService: SmasContextService,
    private toastr: ToastrService,
    public store: Store<AppState>,
  ) {
    super(store);
    this.smasContextService.onConfigUpdated$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.dataFilter = smasContextService.getSmasConText();
      if (this.dataFilter) {
        if (this.dataFilter.year && this.dataFilter.year.currentYear === false) {
          this.checkYearDisabled = true;
          this.disableBtnDele = true;
        } else {
          this.checkYearDisabled = false;
        }
        this.getSchoolYear();
      }
    });
  }

  ngOnInit(): void {
    this.dataFilter = this.smasContextService.getSmasConText();
    if (this.dataFilter) {
      if (this.dataFilter.year && this.dataFilter.year.currentYear === false) {
        this.checkYearDisabled = true;
        this.disableBtnDele = true;
      } else {
        this.checkYearDisabled = false;
      }
    }
    this.getSchoolYear();
  }

  getSchoolYear() {
    this.getAllData();
  }

  search() {
    this.skip = 0;
    this.getAllData();
  }

  getAllData() {
    const input = {
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
    this.api.getAll(input)
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

  openModalDeleteList() {
    const modalRef = this.modal.open(DeleteCollectiveCompetitionComponent);
    modalRef.componentInstance.listIds = this.mySelection;
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
    console.log(this.dataFilter)
    if (this.dataFilter === undefined) {
      this.toastr.warning('Hãy chọn năm học!');
      return
    }
    const modalRef = this.modal.open(AddCollectiveCompetitionComponent, {size: 'md', centered: true});
    modalRef.componentInstance.title = 'Thêm danh hiệu thi đua tập thể';
    modalRef.componentInstance.YearCode = this.dataFilter.year.code;
    modalRef.componentInstance.schoolYearId = this.dataFilter.year.id;
    modalRef.result.then(r => {
      if (r) {
        this.skip = 0;
        this.getAllData();
      }
    }).catch(error => error);
  }

  openModalEdit(id) {
    if (this.dataFilter === undefined) {
      this.toastr.warning('Hãy chọn năm học!');
      return
    }
    const modalRef = this.modal.open(AddCollectiveCompetitionComponent, {size: 'md', centered: true});
    modalRef.componentInstance.title = 'Cập nhật danh hiệu thi đua tập thể';
    modalRef.componentInstance.idTT = id;
    modalRef.componentInstance.YearCode = this.dataFilter.year.code;
    modalRef.result.then(r => {
      if (r) {
        this.getAllData();
      }
    }).catch(error => error);
  }

}

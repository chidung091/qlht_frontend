import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {EmployeePraiseDiscipline} from '../../../../../core/service/model/employee-praise-discipline.model';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DropDownListComponent} from '@progress/kendo-angular-dropdowns';
import {finalize, takeUntil} from 'rxjs/operators';
import {EmployeeService} from '../../../../../core/service/service-model/employee.service';
import {GridParam} from '../../../../../core/service/model/grid-param';
import {EmployeeProfileModel} from '../../../../../core/service/model/Employee-profile';
import {EmployeeDisciplineService} from '../../../../../core/service/service-model/employee-discipline.service';
import {ModalAddEditDisciplineComponent} from '../modal-add-edit-discipline/modal-add-edit-discipline.component';
import {ModalDeleteDisciplineComponent} from '../modal-delete-discipline/modal-delete-discipline.component';
import {SmasContextService} from 'src/app/core/_base/layout/services/smas-context.service';
import {SmasConText} from '../../../../../core/_base/layout/models/smas-context.model';
import {ToastrService} from 'ngx-toastr';
import {Policies} from '../../../../../core/_constants';
import {Store} from '@ngrx/store';
import {CommonStore} from '../../../../../core/common';
import {AppState} from '../../../../../core/reducers';
import {locale} from '../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-discipline-pupil',
  templateUrl: './discipline-pupil.component.html',
  styleUrls: ['./discipline-pupil.component.scss']
})
export class DisciplinePupilComponent extends CommonStore implements OnInit {
  VI_LANG = locale.data;
  isCollapsed = true;
  form: FormGroup;
  public defaultItemSchoolFaculty: { id: string, facultyName: string } = {facultyName: 'Tất cả', id: ''};
  public defaultItemEmployee: { id: string, fullName: string } = {fullName: 'Tất cả', id: ''};
  listEmployee: EmployeeProfileModel[];
  loadEmployee = false;
  @ViewChild('tencanbo') tencanbo: DropDownListComponent;
  @ViewChild('tenToBoMon') tentobomon: DropDownListComponent;
  disableDefaultDistrict = true;
  pageSizes: Array<number> = [5, 10, 20];
  dataDisciplinePupil: Observable<EmployeePraiseDiscipline[]>;
  data: Observable<EmployeePraiseDiscipline[]>;
  listIdsDel: string[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dataDiscipline: GridDataResult;
  totalCount: Observable<number>;
  public buttonCount = 5;
  public loading = true;
  public inforFind: GridParam;
  year$: any;
  namHocObj: SmasConText;
  destroy$ = new Subject<void>();
  date = new Date();
  checkDeleteAll = true;
  checkDisableYear = false;
  public mySelection: string[] = [];
  UserPemiss: string = Policies.EMPLOYEEMANAGEMENT_EMPLOYEE_EDIT;
  private skip = 0;
  private _pageSize = 5;

  constructor(public store: Store<AppState>,
              public modal: NgbModal,
              private fb: FormBuilder,
              private cdfRef: ChangeDetectorRef,
              private notiService: NotiService,
              private employeeService: EmployeeService,
              private smasContextService: SmasContextService,
              private employeeDisciplineService: EmployeeDisciplineService,
              private toastr: ToastrService) {
    super(store);
    this.smasContextService.onConfigUpdated$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.namHocObj = smasContextService.getSmasConText();
      if (this.namHocObj.year) {
        if (this.namHocObj.year && this.namHocObj.year.currentYear === false) {
          this.checkDisableYear = true;
          this.checkDeleteAll = true;
        } else {
          this.checkDisableYear = false;
        }
        if (this.tentobomon) {
          this.form.controls.FacultyId.setValue('');
          this.tentobomon.reset();
        }
        if (this.tencanbo) {
          this.form.controls.EmployeeId.setValue('');
          this.tencanbo.reset();
        }
        this.loadData();
      }
      this.skip = 0;
    });
  }

  ngOnInit(): void {
    this.namHocObj = this.smasContextService.getSmasConText();
    this.form = this.fb.group({
      FacultyId: new FormControl(''),
      EmployeeId: new FormControl(''),
    })
    if (this.namHocObj.year) {
      if (this.namHocObj.year && this.namHocObj.year.currentYear === false) {
        this.checkDisableYear = true;
        this.checkDeleteAll = true;
      } else {
        this.checkDisableYear = false;
      }
      this.loadData();
    }
  }

  search() {
    this.skip = 0;
    this.loadData();
  }

  loadData() {
    this.loading = true;
    const FacultyId = this.form.value.FacultyId;
    const EmployeeId = this.form.value.EmployeeId;
    const SchoolYearId = this.namHocObj.year.id;
    if (SchoolYearId) {
      this.employeeDisciplineService.getAllEmployeeDiscipline(FacultyId, EmployeeId, SchoolYearId, '', '', this.skip, this._pageSize)
        .subscribe(data => {
          this.dataDiscipline = ({
            data: data.items,
            total: data.totalCount
          });
          this.isLoading$.next(true);
          this.loading = false;
        }, error => {
          this.loading = false
          this.isLoading$.next(true);
        })
    }
  }

  nameDepar(event) {
    this.tencanbo.reset();
    if (event.id) {
      this.tencanbo.reset();
      this.form.controls.EmployeeId.setValue('');
      this.disableDefaultDistrict = false;
      this.loadEmployee = true;
      this.employeeService.getEmployeeByFacultyId(event.id)
        .pipe(takeUntil(this.ngUnsubscribe),
          finalize(() => {
            this.loadEmployee = false;
            this.cdfRef.markForCheck()
          })
        )
        .subscribe(data => {
          this.cdfRef.markForCheck()
          this.loadEmployee = false;
          this.listEmployee = data;
        }, error => {
          this.loadEmployee = false;
        });
    } else {
      this.form.controls.EmployeeId.setValue('');
      this.disableDefaultDistrict = true;
      this.loadEmployee = false;
    }
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadData()
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadData()
  }

  onChange(row) {
    this.mySelection = row;
    if (this.namHocObj.year && this.namHocObj.year.currentYear === true) {
      if (row.length > 0) {
        this.checkDeleteAll = false;
      } else {
        this.checkDeleteAll = true;
      }
    } else {
      this.checkDeleteAll = true;
    }
  }

  openModalAdd() {
    if (this.namHocObj === undefined || this.namHocObj.year === undefined) {
      this.toastr.warning('Hãy chọn năm!');
      return
    }
    const modalRef = this.modal.open(ModalAddEditDisciplineComponent, {size: 'md', centered: true});
    modalRef.componentInstance.title = 'Thêm mới thông tin kỷ luật cán bộ'
    modalRef.result.then(result => {
      if (result === 'create') {
        this.skip = 0;
        this.loadData();
      }
    })
  }

  openModalEdit(dataItem: any) {
    if (this.namHocObj === undefined || this.namHocObj.year === undefined) {
      this.toastr.warning('Hãy chọn năm!');
      return
    }
    const modalRef = this.modal.open(ModalAddEditDisciplineComponent, {size: 'md', centered: true});
    modalRef.componentInstance.selectedItem = dataItem;
    modalRef.componentInstance.title = 'Cập nhật thông tin kỷ luật cán bộ'
    modalRef.result.then(result => {
      if (result === 'update') {
        this.skip = 0;
        this.loadData();
      }
    })
  }

  openModalDeleteList() {
    const modalRef = this.modal.open(ModalDeleteDisciplineComponent, {centered: true});
    modalRef.componentInstance.listIds = this.mySelection;
    document.getElementById('deleteDiscipline').focus();
    modalRef.result.then(result => {
      if (result === 'ok') {
        this.skip = 0;
        this.loadData();
        this.mySelection = [];
        this.checkDeleteAll = true
      }
    }).catch(error => error);
  }

}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Observable} from 'rxjs';
import {NotificationService} from '@progress/kendo-angular-notification';
import {AuthNoticeService, UsersDataSource} from '../../../../core/auth';
import {NotiService} from '../../../../core/service/service-model/notification.service';
import {Department} from '../../../../core/service/model/department.model';
import {SchoolFacultyService} from '../../../../core/service/service-model/school-faculty.service';
import {ItemDepartmentModel} from '../../../../core/service/model/item-department.model';
import {Policies} from '../../../../core/_constants/policy.constants';
import {locale} from '../../../../core/_config/i18n/vi';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/reducers';
import {GetAllSchoolFaculty} from '../../../../core/common';


@Component({
  selector: 'kt-department',
  templateUrl: './school-faculty.component.html',
  styleUrls: ['./school-faculty.component.scss']
})
export class SchoolFacultyComponent implements OnInit {
  VI_LANG = locale.data;
  SchoolFacultyCreate: string = Policies.SYSTEMMANAGEMENT_SCHOOLFACULTY_CREATE;
  SchoolFacultyEdit: string = Policies.SYSTEMMANAGEMENT_SCHOOLFACULTY_EDIT;
  SchoolFacultyDelete: string = Policies.SYSTEMMANAGEMENT_SCHOOLFACULTY_DELETE;

  isCollapsed = false;
  public pageSizes: Array<number> = [5, 10, 20];
  public _pageSize = 20;
  // public opendEdit = false;
  public keyWord: '';
  public skip = 0;
  public form: FormGroup;
  public departmentEdit: Department;

  public dataItem: Department;
  public formGroup: FormGroup;
  public formOut: FormControl;
  // public openDel = false;
  // public openAdd = false;
  public boolOk: boolean;
  public selectedItemIDs: number[] = [];
  public mySelection: string[] = [];
  public delAllbtn = true;
  public disabled = false;
  public buttonCount = 5;
  public info = true;
  public type: 'numeric' | 'input' = 'numeric';
  public nameManagerment = '';
  public count: 0;
  public dataSource: UsersDataSource;
  public boolPage = true;
  public boolAdd = false;
  public boolEdit = false;
  public boolDelete = false;

  public total = 0;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public okLoadingAdd: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public okLoadingEdit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public okLoadingDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public gridView: GridDataResult;

  public itemSchoolFaculty: Observable<ItemDepartmentModel>;
  @ViewChild('deleteOk') deleteOk: ElementRef;

  constructor(private modalService: NgbModal,
              private store: Store<AppState>,
              private notiService: NotiService,
              private schoolFacultyService: SchoolFacultyService) {
  }

  public ngOnInit(): void {
    this.selectedItemIDs = [];
    this.form = new FormGroup({
      department: new FormControl(''),
      managerment: new FormControl('')
    });
    this.loadData();
  }

  // khi đóng bất cứ popup nào
  public close(status) {
    // this.openDel = false;
    // this.openAdd = false;
    // this.opendEdit = false;
  }

  // mở popup add/edit
  public opendAdd(num: Department,modelEdit: any) {
    this.departmentEdit = num;
    // this.opendEdit = true;
    this.modalService.open(modelEdit,{windowClass : 'myCustomModalClass',centered: true});
  }

  // public opendDelete() {
  //   this.openDel = true;
  //   setTimeout(() => {
  //     this.deleteOk.nativeElement.select();
  //     this.deleteOk.nativeElement.focus();
  //   }, 100)
  // }
  public opendDelete(modalDelete: any) {
    // this.openDel = true;
    this.modalService.open(modalDelete,{windowClass : 'myCustomModalClass',centered: true});
    document.getElementById('deleteFaculty').focus();
  }

  // chuyền dữ liệu từ compent update sang component chính
  public createDeparment(value) {
    this.formOut = value;
    if (!this.formOut.valid) {
      this.boolOk = false;
    } else {
      this.boolOk = true;
      this.departmentEdit = this.formOut.value;
      this.departmentEdit.facultyName = this.formOut.value.tenBoMon.replace(/(\s\s+| )/g, ' ').trim();
      this.departmentEdit.note = this.formOut.value.ghiChu;
      this.departmentEdit.employeeManagementName = this.formOut.value.hoTenCanBoQuanLy;
    }
  }

  // bắt sự kiện enter
  // @HostListener('document:keyup', ['$event'])
  // onKeyUp(ev: KeyboardEvent) {
  //   if (ev.key === 'Enter') {
  //     if (this.openAdd === true) {
  //       this.okAdd('yes')
  //     }
  //     if (this.opendEdit === true) {
  //       this.okEdit('yes')
  //     }
  //     if (this.openDel) {
  //       this.delete(this.departmentEdit)
  //     }
  //   }
  // }

  // sự kiện xóa 1, hoặc xóa mảng
  delete(dataItem: any) {
    this.boolDelete = true;
    this.okLoadingDelete.next(true);
    this.schoolFacultyService.deleteListDepartment(this.mySelection).subscribe(() => {
      this.okLoadingDelete.next(false);
      this.skip = 0;
      this.loadData();
      // this.openDel = false;
      this.modalService.dismissAll();
      this.mySelection = [];
      this.notiService.deleteSuccess();
      this.boolDelete = false;
      this.store.dispatch(new GetAllSchoolFaculty())
    }, error1 => {
      this.boolDelete = false;
      this.okLoadingDelete.next(false);
    });
    this.disabled = false
    this.delAllbtn = true;

  }

  // thêm mới một phần tử
  okAdd(status) {
    // xoay của dialog Add
    this.boolAdd = true;
    if (!this.boolOk) {
      this.formOut.markAllAsTouched();
      this.boolAdd = false;
      this.okLoadingAdd.next(false);
    } else {
      this.okLoadingAdd.next(true);
      this.schoolFacultyService.addDepartment(this.departmentEdit).subscribe(() => {
        this.skip = 0;
        this.keyWord = '';
        this.nameManagerment = '';
        this.form.patchValue({
          department: '',
          managerment: ''
        });
        // this.openAdd = false;
        this.modalService.dismissAll();
        this.loadData();
        this.notiService.createSuccess();
        this.okLoadingAdd.next(false);
        this.boolAdd = false;
        this.store.dispatch(new GetAllSchoolFaculty())
      }, error1 => {
        this.okLoadingAdd.next(false);
        this.boolAdd = false;
      });
    }
  }

  // chỉnh sửa một phần tử
  okEdit(status) {
    this.boolEdit = true;
    if (!this.boolOk) {
      this.formOut.markAllAsTouched();
      this.boolEdit = false;
    } else {
      this.okLoadingEdit.next(true);
      this.schoolFacultyService.updateDepartment(this.departmentEdit).subscribe(() => {
        // this.opendEdit = false;
        this.modalService.dismissAll();
        this.loadData();
        this.notiService.updateSuccess();
        this.okLoadingEdit.next(false);
        this.boolEdit = false;
        this.store.dispatch(new GetAllSchoolFaculty())
      }, error1 => {
        this.boolEdit = false;
        this.okLoadingEdit.next(false);
      });
    }
  }

  // tìm kiếm phần tử theo tên bộ môn và tên cán bộ
  search() {
    this.keyWord = this.form.get('department').value.replace(/(\s\s+| )/g, ' ').trim();
    this.nameManagerment = this.form.get('managerment').value.replace(/(\s\s+| )/g, ' ').trim();
    this.skip = 0;
    this.loadData();
  }

  // sự kiện thay đổi mảng chọn xóa
  onChange(row: any) {
    this.mySelection = row;
    this.disabled = this.mySelection.length > 0;
    this.delAllbtn = this.mySelection.length <= 0;
  }

  // sự kiện thay đổi khi next trang
  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadData();
  }

  // sự kiện tha đổi khi chon lai pagesize
  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadData();
  }

  // lấy dữ liệu theo các từ khóa
  loadData() {
    this.boolPage = true;
    // this.itemSchoolFaculty = this.schoolFacultyService.getDepartment(this.keyWord, this.nameManagerment, this._pageSize, this.skip);
    this.schoolFacultyService.getDepartment(this.keyWord, this.nameManagerment, this._pageSize, this.skip).subscribe(datas => {
      this.isLoading$.next(false);
      this.gridView = ({
        data: datas.items,
        total: datas.totalCount
      });
      this.isLoading$.next(true);
      this.boolPage = false;
    }, error1 => {
      this.boolPage = false;
      this.isLoading$.next(true);
    })
  }
  // open model add
  openAddFaculty(modalAdd){
    this.modalService.open(modalAdd,{windowClass : 'myCustomModalClass',centered: true});
  }
}

import {AfterViewInit, Component, ElementRef, OnInit, Optional, ViewChild,} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Select, Store} from '@ngxs/store';
import {select, Store as StoreRx} from '@ngrx/store';
import {NotificationService} from '@progress/kendo-angular-notification';
import {AuthNoticeService} from '../../../../core/auth';
import {NotiService} from '../../../../core/service/service-model/notification.service';
import {ClassroomState} from '../../../../core/service/states/classroom.state';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ClassroomModel, ExtraClass,} from '../../../../core/service/model/classroom.model';
import {
  DeleteClassroom,
  DeleteClassroomList,
  GetAllClassroom,
  GetClassByGradeAndYear,
} from '../../../../core/service/actions/classroom.action';
import {GridDataResult, PageChangeEvent, SelectableSettings} from '@progress/kendo-angular-grid';
import {ClassroomService} from '../../../../core/service/service-model/classroom.service';
import {ComparisonOperator, FilterItems, GridParam, SortDirection} from '../../../../core/service/model/grid-param';
import {SmasContextService} from '../../../../core/_base/layout';
import {Category, GetCategoriesWithParent, getCateWithParent, ListCateCode} from '../../../../core/category';
import {UpdateClassComponent} from './update-class/update-class.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DropDownListComponent} from '@progress/kendo-angular-dropdowns';
import {Policies} from '../../../../core/_constants/policy.constants';
import {locale} from '../../../../core/_config/i18n/vi';
import {SmasConText} from '../../../../core/_base/layout/models/smas-context.model';
import {CategoryType} from '../../../../core/_constants';
import {NgUnsubscribe} from '../../../shared/directives';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'kt-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.scss'],
})
export class ClassRoomComponent extends NgUnsubscribe implements OnInit, AfterViewInit {
  VI_LANG = locale.data;
  destroy$ = new Subject<void>();
  smasContextModel: SmasConText;

  classRoomCreate: string = Policies.SYSTEMMANAGEMENT_CLASSPROFILE_CREATE;
  classRoomEdit: string = Policies.SYSTEMMANAGEMENT_CLASSPROFILE_EDIT;
  classRoomDelete: string = Policies.SYSTEMMANAGEMENT_CLASSPROFILE_DELETE;

  defaultKhoi = {cateName: 'Tất cả', cateCode: null};
  date = new Date();
  delete = false;
  disableDelete = false;
  checkDisableYear = false;
  listIdsDel: string[] = [];
  checkDeleteAll = true;
  disableClass = true;
  public _pageSize = 5;
  public pageSizes: Array<number> = [10, 20];
  public dataItem: ClassroomModel;
  isCollapsed = true;
  classRooms: Observable<ClassroomModel[]>;
  form: FormGroup;
  searchValue = {khoi: '', lop: '', tenlop: '', trangThai: ''};
  listClass = [];
  public lLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public kLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public gridView: GridDataResult;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public nameTeacher = '';
  public skip = 0;
  public loading = false;
  public loadingdelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public inforFind: GridParam;
  public listClasses: ClassroomModel[] = [];
  selectTableSetting: SelectableSettings = {
    checkboxOnly: true,
  };
  private  oldparams = '';
  classRoom: ClassroomModel = new ClassroomModel();
  @Select(ClassroomState.getClassProfiles) classProfiles$: Observable<ClassroomModel[]>;
  @Select(ClassroomState.getAllClassroom) listClassRoom: Observable<ClassroomModel[]>
  grade$: Observable<Category[]>;
  @ViewChild('selectKhoi') resetKhoi: DropDownListComponent;
  @ViewChild('classReset') resetLop: DropDownListComponent;
  @ViewChild('buttonDelete') deleteClassroom: ElementRef;

  ngAfterViewInit(): void {
    setTimeout(() => this.ngOnInit());
  }

  constructor(
    private modalService: NgbModal,
    private store: Store,
    private storeRx: StoreRx,
    private notificationService: NotificationService,
    private authNoticeService: AuthNoticeService,
    private notiService: NotiService,
    private classRoomService: ClassroomService,
    private smasContextService: SmasContextService,
  ) {
    super();
    this.grade$ = this.storeRx.pipe(takeUntil(this.ngUnsubscribe), select(getCateWithParent, CategoryType.DM_KHOI));
    this.classRooms = this.store.select(ClassroomState.getAllClassroom);
    this.smasContextModel = this.smasContextService.getSmasConText();

    this.smasContextService.onConfigUpdated$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((ctx) => {
    if(this.smasContextModel.year && this.smasContextModel.level &&
      this.smasContextModel.year.code === ctx.year.code &&
      this.smasContextModel.level.schoolLevelCode === ctx.level.schoolLevelCode ||
      ctx.year.code === undefined ||  ctx.level.schoolLevelCode === undefined){
      } else {
        this.smasContextModel = this.smasContextService.getSmasConText();
            this.checkYear();
            this.getGrade();

      }

    });
    this.classRoom.className = 'Tất cả';
    this.form = new FormGroup({
      khoi: new FormControl(''),
      idlop: new FormControl(''),
      ten: new FormControl('', [Validators.maxLength(100)]),
    });
    this.grade$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.loading = true;
      this.kLoading$.next(true);
      if (!data) {
        this.storeRx.dispatch(new GetCategoriesWithParent({
          cateCode: ListCateCode.dmKhoi,
          cateParentCode: this.smasContextModel.level.schoolLevelCode
        }));
      } else {
        if(this.resetKhoi){
          this.resetKhoi.reset();
        }
        this.searchValue.lop = '';
        this.form.value.khoi = '';
        if(this.resetLop){
          this.resetLop.reset();
        }
        this.kLoading$.next(false);
        this.loadData();
      }
    })
  }


  ngOnInit(): void {
  }

  // lấy khối học theo cấp học và load data
  getGrade() {
    this.loading = true;
    this.storeRx.dispatch(new GetCategoriesWithParent({
      cateCode: ListCateCode.dmKhoi,
      cateParentCode: this.smasContextModel.level.schoolLevelCode
    }));
    this.disableClass = true;
  }

  // check year thực hiện call api load data theo năm
  checkYear() {
    // chẹk theo tháng để xem năm học hiện tại tính theo năm học bắt đầu
    // sử dụng biến trung gian để set để không thay đôi năm hiện tại
    // tháng hiện tại tính theo vị trí (tháng 7 vị trí là 6)

    // if(this.date.getMonth()<6){
    //   this.date.setFullYear(this.date.getFullYear() -1);
    // }

    // chek năm học theo cả đầu và cuối (luôn đúng)
    // if(parseInt(this.smasContextModel.year.code.trim().substring(0,4),10) <= this.date.getFullYear() &&
    // this.date.getFullYear() <= parseInt(this.smasContextModel.year.code.trim().
    // substring(this.smasContextModel.year.code.trim().length - 4,this.smasContextModel.year.code.trim().length),10)){}
    // check xem năm học được chọn có khác với năm học hiện tại hay không
    if ((this.smasContextModel.year.code)&&
      (parseInt(this.smasContextModel.year.code.trim().substring(0, 4), 10) !== this.date.getFullYear())) {
      this.checkDisableYear = true;
      this.checkDeleteAll = true;
    } else {
      this.checkDisableYear = false;
      this.checkDeleteAll = true;
    }
    if (this.resetKhoi) {
      this.resetKhoi.reset();
    }
    if (this.resetLop) {
      this.resetLop.reset();
    }
    this.form.patchValue({
      khoi: '',
      idlop: '',
      ten: '',
    });
    this.skip = 0;
    this.disableClass = true;
  }

  // xóa
  openModalDelete(mymodal) {
    this.loadingdelete.next(false);
    this.modalService.open(mymodal, {windowClass: 'myCustomModalClass', centered: true});
    document.getElementById('focusDelete').focus();
  }
  // open model cập nhật lớp học trả về thực hiện loading data
  openModalEdit(dataItem) {
    const modalRef = this.modalService.open(UpdateClassComponent, {
      size: 'xl',
      centered: true,
    });
    modalRef.componentInstance.namHoc$ = this.smasContextModel.year;
    modalRef.componentInstance.dataKhoi$ = this.grade$;
    modalRef.componentInstance.schoolLevel = this.smasContextModel.level;
    modalRef.componentInstance.title = 'Cập nhật lớp học';
    modalRef.componentInstance.dataEdit = dataItem;
    modalRef.result
      .then(() => {
        this.loadData();
      })
      .catch((error) => error);
    this.dataItem = dataItem;
  }

  // xác nhận xóa
  deleteClassRoom(yes: string) {
    this.disableDelete = true;
    this.loadingdelete.next(true);
    if (this.listIdsDel.length === 1) {
      this.store
        .dispatch(new DeleteClassroom(this.listIdsDel[0]))
        .subscribe(() => {
          this.skip = 0;
          this.listIdsDel = [];
          this.loadData();
          this.checkDeleteAll = true;
          this.loadingdelete.next(false);
          this.delete = false;
          this.modalService.dismissAll();
        });
    } else if (this.listIdsDel.length !== 1 && this.listIdsDel.length !== 0) {
      this.store
        .dispatch(new DeleteClassroomList(this.listIdsDel))
        .subscribe(() => {
          this.notiService.deleteSuccess();
          this.skip = 0;
          this.listIdsDel = [];
          this.loadData();
          this.checkDeleteAll = true;
          this.loadingdelete.next(false);
          this.delete = false;
          this.modalService.dismissAll();
        });
    }
    this.disableDelete = false;

  }

  // chọn các lớp thực hiện xóa
  onChange(row: any) {
    if (
      parseInt(this.smasContextModel.year.code.trim().substring(0, 4), 10) !==
      this.date.getFullYear()
    ) {
      this.checkDeleteAll = true;
    } else {
      this.listIdsDel = row;
      this.checkDeleteAll = this.listIdsDel.length <= 0;
    }
  }

  // open model thêm mới lớp học trả về reset tìm kiếm + loaddata
  opend() {
    const modalRef = this.modalService.open(UpdateClassComponent, {
      size: 'xl',
      centered: true,
    });
    modalRef.componentInstance.namHoc$ = this.smasContextModel.year;
    modalRef.componentInstance.dataKhoi$ = this.grade$;
    modalRef.componentInstance.schoolLevel = this.smasContextModel.level;
    modalRef.componentInstance.title = 'Thêm mới lớp học';
    modalRef.result
      .then(() => {
        this.resetLop.reset();
        this.resetKhoi.reset();
        this.form.patchValue({
          khoi: '',
          idlop: '',
          ten: '',
        });
        this.skip = 0;
        this.loadData();
        this.loading = false;
      })
      .catch((error) => error);
  }

  // hàm loading data tìm kiếm theo khối lớp gvcn bắn api theo param
  loadData() {
    const param = {};
    let arrayGrade = [];
    this.grade$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      if(data){
        data.map((grade) => {
          arrayGrade.push(grade.cateCode);
        });
      }
    });

    this.loading = true;
    this.inforFind = new GridParam();
    this.inforFind.sort = 'creationtime';
    this.inforFind.sortDirection = SortDirection.DESC;
    this.inforFind.filterItems = [];
    if (
      this.form.value.idlop === undefined ||
      this.form.value.idlop === null ||
      this.form.value.idlop === '' ||
      (this.form.value.khoi === undefined && this.form.value.khoi === '') ||
      this.form.value.khoi === null
    ) {
      param['gradeLevelCodes'] = arrayGrade;
    }
    if (this.form.value.idlop) {
      this.inforFind.filterItems.push({
        value: this.form.value.idlop,
        propertyName: 'id',
        comparison: ComparisonOperator.Equal,
      } as FilterItems);
    }

    if (this.form.value.ten) {
      this.inforFind.filterItems.push({
        value: this.form.value.ten,
        propertyName: 'teacherName',
        comparison: ComparisonOperator.Contains,
      } as FilterItems);
    }

    if (this.smasContextModel.year) {
      this.inforFind.filterItems.push({
        value: this.smasContextModel.year.id,
        propertyName: 'schoolYearId',
        comparison: ComparisonOperator.Equal,
      });
    }
    this.inforFind.skipCount = this.skip;
    this.inforFind.maxResultCount = this._pageSize;

    param['params'] = this.inforFind;

    if (this.form.value.khoi) {
      arrayGrade = [];
      arrayGrade.push(this.form.value.khoi);
      param['gradeLevelCodes'] = arrayGrade;
    }
      this.classRoomService.getClassByPage(param).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (datax) => {
          if (datax) {
            this.listClass = datax.items;
            this.gridView = {
              data: datax.items,
              total: datax.totalCount,
            };
          }
          this.isLoading$.next(true);
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.isLoading$.next(true);
        }
      );
  }

  // thay đổi kích thước page size
  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadData();
  }

  // next skip
  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadData();
  }

  // ghép lớp học theo khối - tìm kiếm
  checkClass() {
    this.lLoading$.next(true);
    if (this.form.value.khoi) {
      // get api lop-hoc/tim-kiem/{khoi}
      this.store
        .dispatch(
          new GetClassByGradeAndYear(
            this.form.value.khoi,
            this.smasContextModel.year.id
          )
        )
        .toPromise()
        .then(
          (res) => {
            this.resetLop.reset();
            this.searchValue.lop = '';
            this.disableClass = false;
            this.lLoading$.next(false);
          },
          (error) => {
            this.lLoading$.next(false);
          }
        );
      this.store.select(GetAllClassroom).subscribe((data) => {
        this.listClasses = data;
      });
    } else {
      this.resetLop.reset();
      this.searchValue.lop = '';
      this.lLoading$.next(false);
      this.form.controls.idlop.setValue('');
      this.disableClass = true;
    }
  }

  // chọn lơp ở ô tìm kiếm
  selectionLop(lop) {
    this.searchValue.lop = lop.id;
    this.searchValue.tenlop = lop.tenLop;
    const buttonID = document.getElementById('searchBtn');
    if (buttonID !== null && this.searchValue.lop !== null)
      (buttonID as HTMLInputElement).removeAttribute('disabled');
  }

  // button tìm kiếm
  submit1() {
    if (!this.form.valid) {
      this.notiService.showNoti(this.VI_LANG.FIELD.TEACHER_NAME + ' ' + this.VI_LANG.COMMON_ERROR.MAX_LENGTH_100,
        'error'
      );
    } else {
      this.form.value.idlop = this.searchValue.lop;
      this.skip = 0;
      this.loadData();
    }
  }

  // cắt trim() space ô giáo viên  -  tìm kiếm
  formatGV() {
    let note = '';
    if (this.form.value.ten) {
      note = this.form.value.ten.trim();
    }
    this.form.patchValue({
      ten: note,
    });
  }
}

import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable} from "rxjs";
import {GridDataResult, PageChangeEvent} from "@progress/kendo-angular-grid";
import {ClassroomModel} from "../../../../../core/service/model/classroom.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClassroomService} from "../../../../../core/service/service-model/classroom.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "@progress/kendo-angular-notification";
import {AuthNoticeService} from "../../../../../core/auth";
import {NotiService} from "../../../../../core/service/service-model/notification.service";
import {SmasContextService} from "../../../../../core/_base/layout";
import {DropDownListComponent} from "@progress/kendo-angular-dropdowns";
import {finalize, takeUntil} from "rxjs/operators";
import {EmployeeService} from "../../../../../core/service/service-model/employee.service";
import {locale} from "../../../../../core/_config/i18n/vi";
import {EmployeeProfileModel} from "../../../../../core/service/model/Employee-profile";
import {SmasConText} from "../../../../../core/_base/layout/models/smas-context.model";
import {CommonStore, getAllSchoolFaculty, GetAllSchoolFaculty, isAllSchoolFacultyLoaded, SchoolFacultyModel} from "../../../../../core/common";
import {AppState} from "../../../../../core/reducers";
import {CatalogModel} from "../../../../../core/service/model/catalog.model";
import {CatalogState} from "../../../../../core/service/states/catalog.state";
import {select, Store} from "@ngrx/store";
import {Select} from "@ngxs/store";
import {HeadTeacherAssignmentService} from "../../../../../core/service/service-model/head-teacher-assignment.service";
import {Category} from "../../../../../core/category";
import {HeadTeacherAssignmentModel} from "../../../../../core/service/model/head-teacher-assignment.model";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";
import {HeadTeacherAssignmentModule} from "../head-teacher-assignment.module";

@Component({
  selector: 'kt-list-head-teacher-assignment',
  templateUrl: './list-head-teacher-assignment.component.html',
  styleUrls: ['./list-head-teacher-assignment.component.scss']
})
export class ListHeadTeacherAssignmentComponent extends CommonStore implements OnInit {

  VI_LANG = locale.data;
  smasContextModel: SmasConText;
  isCollapsed = true;
  formSearch: FormGroup;
  formAddEdit: FormGroup;
  gradeLevelCode:string;
  bool: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private editedRowIndex: number;

  @ViewChild('tencanbo') tencanbo: DropDownListComponent;
  @ViewChild('tenToBoMon') tentobomon: DropDownListComponent;
  // @Select(CatalogState.getCatalogAllKhoi) dataKhoi: Observable<CatalogModel[]>;


  //dropdownlist tổ bộ môn search
  schoolFaculty$: Observable<SchoolFacultyModel[]>;
  public defaultItemSchoolFaculty: { id: string, facultyName: string } = {facultyName: '[Tất cả]', id: null};
  schoolFacultyLoaded$: Observable<boolean>;

  //dropdownlist search cán bộ theo tổ bộ môn
   listEmployee: EmployeeProfileModel[];
   disableDefaultDistrict: boolean = true;
   loadEmployee: boolean = false;
   defaultItemEmployee: { id: string, fullName: string } = {fullName: '[Tất cả]', id: null};

  gradePickNumber = 0;
  gradeOne$: string;
  selectGrade: Category;

  classRoom$: Observable<ClassroomModel[]>;
  dataGird: [{id:string,name:string}?] =[];

  listHeadTeacherAssignment: any;
  phanCongChuNhiem: Observable<HeadTeacherAssignmentModule[]>;
  newModel : HeadTeacherAssignmentModel[];

  public listEmployeeEdit: EmployeeProfileModel[] = [];


  // loading toàn màn hình
  public loading = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public store: Store<AppState>,
    private smasContextService: SmasContextService,
    private cdfRef: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private headTeacherAssignment: HeadTeacherAssignmentService,

  ) {
    super(store);
    this.smasContextModel = this.smasContextService.getSmasConText();
    this.smasContextService.onConfigUpdated$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((ctx) => {
      if (this.smasContextModel.year && this.smasContextModel.level &&
        this.smasContextModel.year.code === ctx.year.code &&
        this.smasContextModel.level.schoolLevelCode === ctx.level.schoolLevelCode ||
        ctx.year.code === undefined || ctx.level.schoolLevelCode === undefined) {
      } else {
        this.smasContextModel = this.smasContextService.getSmasConText();
        this.loadData();
      }
    });
    this.formSearch = new FormGroup({
      FacultyId: new FormControl(''),
      EmployeeId: new FormControl(''),
    });

  }

  getYear(){
    this.smasContextService.onConfigUpdated$.subscribe(data => {
    });
  }



  ngOnInit(): void {
    this.loadSchoolFaculty();
    this.bool.next(true);


  }

  changeGrade(item,index) {
    this.gradePickNumber = index;
    this.selectGrade = item;
    this.getDataClassRoom();
  }

  // láy danh sách tổ bộ môn
  loadSchoolFaculty() {
    this.schoolFaculty$ = this.store.pipe(takeUntil(this.ngUnsubscribe),select(getAllSchoolFaculty))
    this.schoolFacultyLoaded$ = this.store.pipe(takeUntil(this.ngUnsubscribe), select(isAllSchoolFacultyLoaded))
    this.schoolFaculty$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new GetAllSchoolFaculty())
      }
    })
  }
  //lấy tên các cán bộ khi thay đổi tổ bộ môn
  nameDepar(event) {
    this.tencanbo.reset();
    if (event.id == null) {
      this.formSearch.controls.EmployeeId.setValue('');
      this.disableDefaultDistrict = true;
      this.loadEmployee = false;
    } else {
      this.tencanbo.reset();
      this.formSearch.controls.EmployeeId.setValue('');
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
      // this.form.value.tenCanBo = null;
    }
  }

 //load dữ liệu
  loadData() {
    this.grade$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if (value && (value[0].cateCode !== this.gradeOne$)) {
        this.gradeOne$ = value[0].cateCode;
        console.log('value grade', value)
        this.selectGrade = value[0];
        console.log('vào thầng loaddata đầu',this.selectGrade)
        this.getDataClassRoom();
        this.bool.next(true);
      }
      this.bool.next(true);
    })
  }

  getDataClassRoom() {
    this.classRoom$ = this.headTeacherAssignment.getClassByGradeAndYear(this.selectGrade.cateCode, this.smasContextModel.year.code).pipe(takeUntil(this.ngUnsubscribe));
    this.phanCongChuNhiem = this.headTeacherAssignment.getHeadTeacherAssignment(this.smasContextModel.year.id, this.selectGrade.cateCode).pipe(takeUntil(this.ngUnsubscribe));
    this.classRoom$.subscribe(valueClassroom =>{
      if(valueClassroom){
        this.phanCongChuNhiem.subscribe((dataa) => {
          if (dataa) {
            this.listHeadTeacherAssignment = dataa;
            console.log('data phân công chủ nhiệm', dataa)
            this.classRoom$.subscribe((data) => {
                console.log('lớp học', data)
                this.newModel = data.map(value => {
                  let e: HeadTeacherAssignmentModel[];
                  e = (this.listHeadTeacherAssignment.filter(datas => datas.classRoomId === value.id));
                  if (e.length > 0) {
                    return new HeadTeacherAssignmentModel(e[0].employeeId, e[0].employeeName,
                      e[0].facultyId, e[0].facultyName,
                      e[0].schoolYearId, e[0].schoolYearName,
                      e[0].gradeLevelCode, e[0].gradeLevelName,
                      e[0].classRoomId, e[0].classRoomName);
                  } else {
                    return new HeadTeacherAssignmentModel(null, null,
                      null, null,
                      this.smasContextModel.year.id, this.smasContextModel.year.code,
                      value.gradeLevel, this.selectGrade.cateName,
                      value.id, value.className);
                  }
                })
              console.log('mảng mới', this.newModel)
              this.bool.next(true);
            })
          }
        })
      }
    })
  }


  chose(item:any){
    //console.log(item)
  }

  // nút button khi edit
  public editHandler({sender, rowIndex, dataItem}) {
    this.closeEditor(sender);
    this.formAddEdit = new FormGroup({
      facultyName: new FormControl(dataItem.facultyName),
      facultyId: new FormControl(dataItem.facultyId),
      employeeName: new FormControl(dataItem.employeeName)
    });
    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formAddEdit);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formAddEdit = undefined;
  }

  public cancelHandler({sender, rowIndex}) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({sender, rowIndex, formGroup, isNew}) {
    sender.closeRow(rowIndex);
  }

  // chooseValue(){}

  addHandler() {

  }

  handleFilter(value) {
    this.checkCateName(value);
    this.listEmployeeEdit = [];
    this.listEmployeeEdit = this.listEmployee.filter(item => item.fullName.toLowerCase().indexOf(value.trim().toLowerCase()) !== -1);
  }

  checkCateName($event: string) {

  }
}

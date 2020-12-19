import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Department} from "../../../../../../core/service/model/department.model";
import {Employee} from "../../../../../../core/service/model/Employee";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DropDownListComponent} from "@progress/kendo-angular-dropdowns";
import {EmployeeService} from "../../../../../../core/service/service-model/employee.service";
import {ListDepartment} from "../../../../../../core/service/actions/department.action";
import {Select, Store} from "@ngxs/store";
import {DepartmentState} from "../../../../../../core/service/states/department.state";
import {finalize, takeUntil} from "rxjs/operators";
import {CatalogModel, ListCatalog} from "../../../../../../core/service/model/catalog.model";
import {ClassroomState} from "../../../../../../core/service/states/classroom.state";
import {ClassroomModel} from "../../../../../../core/service/model/classroom.model";
import {SmasContextService} from "../../../../../../core/_base/layout";
import {SchoolLevel} from "../../../../../../core/auth/_models";
import {CatalogState} from "../../../../../../core/service/states/catalog.state";
import {GetCatalogTwo} from "../../../../../../core/service/actions/catalog.action";
import {GetAllClassroom, GetClassByGradeAndYear} from "../../../../../../core/service/actions/classroom.action";
import {ListCateCode} from "../../../../../../core/category";
import {EmployeeProfileModel} from "../../../../../../core/service/model/Employee-profile";

@Component({
  selector: 'kt-modal-add-edit-head-teacher-substitutions',
  templateUrl: './modal-add-edit-head-teacher-substitutions.component.html',
  styleUrls: ['./modal-add-edit-head-teacher-substitutions.component.scss']
})
export class ModalAddEditHeadTeacherSubstitutionsComponent implements OnInit {
  @Input() title: any;

  @Select(ClassroomState.getAllClassroom) listClassRoom: Observable<ClassroomModel[]>
  @ViewChild('selectKhoi') resetKhoi: DropDownListComponent;
  @ViewChild('classReset') resetLop: DropDownListComponent;
  @ViewChild('tencanbo') tencanbo: DropDownListComponent;
  public defaultItemSchoolFaculty: { id: string, facultyName: string } = {facultyName: '[Lựa chọn]', id: null};
  public defaultItemEmployee: { id: string, hoTen: string } = {hoTen: '[Lựa chọn]', id: null};
  disableDefaultEmployee: boolean = true;
  public lLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  classRoom: ClassroomModel = new ClassroomModel
  public valueDateFrom: Date = new Date();
  public valueDateTo: Date = new Date();
  disableClass = true;
  destroy$ = new Subject<void>();
  levelSchool: SchoolLevel;
  namHocObj: any;
  public listClasses: ClassroomModel[] = [];
  constructor(private _NgbActiveModal: NgbActiveModal,
              private employeeService: EmployeeService,
              private smasContextService: SmasContextService,
              private fb: FormBuilder,
              private cdfRef: ChangeDetectorRef,
              private store: Store,) {
    this.form = new FormGroup({
      khoi: new FormControl(''),
      idlop: new FormControl(''),
      tenGiaoVienCN: new FormControl(''),
      tenToBoMon: new FormControl(''),
      tenGiaoVienLT: new FormControl(''),
    });
  }
  listEmployee: EmployeeProfileModel[];
  listSchoolFaculty: Observable<Department[]>;
  public form: FormGroup;
  submitted = false;
  loadisLoadingBoMon: boolean;
  isDateValid: boolean = true;
  loadEmployee: boolean = false;
  grade$: Observable<CatalogModel[]>;
  public kLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  defaultKhoi = {cateName: 'Tất cả', cateCode: null};

  ngOnInit(): void {
    this.loadDepartment();
    this.form = this.fb.group({
      tenToBoMon: new FormControl(''),
      toBoMonId: new FormControl('',[Validators.required]),
      canBoId: new FormControl(''),
    })
   // this.getlevel();

  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // getlevel() {
  //   this.smasContextService.level.pipe(takeUntil(this.destroy$)).subscribe(data => {
  //     if (data) {
  //       this.levelSchool = data
  //     } else {
  //       this.levelSchool = JSON.parse(sessionStorage.getItem('currentLevel'))
  //     }
  //     this.getGrade();
  //   })
  // }
  getGrade() {
    this.kLoading$.next(true);
    this.store.dispatch(new GetCatalogTwo(ListCateCode.dmKhoi, this.levelSchool.schoolLevelCode)).subscribe(() => {
      this.kLoading$.next(false);
      }, error => {
      this.kLoading$.next(false);
    });
    this.grade$ = this.store.select(CatalogState.getCatalogTwo);
  }

  // lấy lớp học theo khối
  checkClass() {
    console.log(this.form.value.khoi)
   if(this.form.value.khoi !== null){
     this.disableClass = false;
   } else {
     this.disableClass = true;
   }
  }

  // lấy tổ bọ môn
  loadDepartment() {
    this.store.dispatch(new ListDepartment());
    this.listSchoolFaculty = this.store.select(DepartmentState.depar);
  }

  get activeModal() {
    return this._NgbActiveModal;
  }
  public cancel() {
    this.activeModal.dismiss();
  }
  get f() {
    return this.form.controls;
  }




  nameDepar(event) {
    this.tencanbo.reset();
    this.form.get('toBoMonId').setValue(event.id);
    if (event.id == null) {
      this.form.controls['canBoId'].setValue('');
      this.disableDefaultEmployee = true;
      this.loadEmployee = false;
    } else {
      this.tencanbo.reset();
      this.form.controls['canBoId'].setValue('');
      this.disableDefaultEmployee = false;
      this.loadEmployee = true;
      this.employeeService.getEmployeeByFacultyId(this.form.value.toBoMonId)
        .pipe(
          finalize(() => {
            this.loadEmployee = false;
            this.cdfRef.markForCheck()
          })
        ).subscribe(data => {
        this.loadEmployee = false;
        this.listEmployee = data;
      }, error => {
        this.loadEmployee = false;
      })
    }
  }

  onSubmit() {}

}

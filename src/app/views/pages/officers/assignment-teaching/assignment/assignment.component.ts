import {Component, OnInit, ViewChild} from '@angular/core';
import {locale} from '../../../../../core/_config/i18n/vi';
import {takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {Category, GetCategoriesWithParent, getCateWithParent, getCateWithParentLoaded, ListCateCode} from '../../../../../core/category';
import {CategoryType} from '../../../../../core/_constants';
import { Observable} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '@progress/kendo-angular-notification';
import {AuthNoticeService} from '../../../../../core/auth';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {SmasContextService} from '../../../../../core/_base/layout';
import {SmasConText} from '../../../../../core/_base/layout/models/smas-context.model';
import { NgUnsubscribe } from '../../../../shared/directives';
import {AppState} from '../../../../../core/reducers';
import {DropDownListComponent} from '@progress/kendo-angular-dropdowns';
import {
  CommonStore,
  GetAllSchoolFaculty,
  getAllSchoolFaculty,
  isAllSchoolFacultyLoaded,
  SchoolFacultyModel
} from '../../../../../core/common';
import { FormControl, FormGroup} from '@angular/forms';
import {ClassroomService} from '../../../../../core/service/service-model/classroom.service';
import {ClassroomModel} from '../../../../../core/service/model/classroom.model';
import {EmployeeService} from '../../../../../core/service/service-model/employee.service';
import {EmployeeProfileModel} from '../../../../../core/service/model/Employee-profile';
import {SemesterModel} from '../../../../../core/employee/assignment-teaching/assignment-teaching.module';

@Component({
  selector: 'kt-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent extends CommonStore implements OnInit {

  isCollapsed = false;
  VI_LANG = locale.data;
  active: string;

  defaultItem: {id: string, name: string} = {id: null, name: 'Lựa chọn'};
  listSemester : SemesterModel[] = [{id: '1', name: 'Học kỳ 1'}, {id: '2', name: 'Học kỳ 2'}];
  defaultClassroom: ClassroomModel = {id: null, className: 'Lựa chọn'};
  defaultTeacher: {id: string, fullName: string} = {id: null, fullName: 'Lựa chọn'};
  defaultCategory: {cateCode: string, cateName: string} = {cateCode: null, cateName: 'Lựa chọn'};
  defaultSchoolFaculty: {id: string, facultyName: string} = {id: null, facultyName: 'Lựa chọn'};

  date = new Date();

  // Dropdown Teacher
  loadingDropdownTeacher = false;

  // Lớp học
  listClassroom: ClassroomModel[];

  // Cán bộ
  listEmployee: EmployeeProfileModel[];

  // Select Dropdown To Reset Form
  @ViewChild('gradeLevel') resetGrade: DropDownListComponent;
  @ViewChild('class') resetClass: DropDownListComponent;
  @ViewChild('semester') resetSemester: DropDownListComponent;
  @ViewChild('schoolFaculty') resetSchoolFaculty: DropDownListComponent;
  @ViewChild('teacher') resetTeacher: DropDownListComponent;

  smasContextModel: SmasConText;

  // Data Output Search
  dataOutput: any;
  // Tạo Form Group Search
  public formDataSearch: FormGroup = new FormGroup({
    semester: new FormControl('', []),
    gradeLevel: new FormControl('', []),
    class: new FormControl('', []),
    schoolFaculty: new FormControl('', []),
    teacher: new FormControl('', []),
    active: new FormControl('', []),
  })

  constructor(
    private modalService: NgbModal,
    private store$: Store<AppState>,
    private notificationService: NotificationService,
    private authNoticeService: AuthNoticeService,
    private notiService: NotiService,
    private smasContextService: SmasContextService,
    private classroomService: ClassroomService,
    private employeeService: EmployeeService,
  ) {
    super(store$);
  }

  ngOnInit(): void {
    this.formDataSearch.controls.class.disable();
    this.formDataSearch.controls.teacher.disable();
  }

  // Reset data form search
  resetFormSearch() {
    this.resetSemester.reset();
    this.resetGrade.reset();
    this.resetClass.reset();
    this.resetSchoolFaculty.reset();
    this.resetTeacher.reset();
    this.formDataSearch.controls.class.disable();
    this.formDataSearch.controls.teacher.disable();
  }

  // Thay đổi giá trị học kỳ để thay đổi tab học kỳ
  changeValueSemester() {
    if (this.formDataSearch.value.semester) {
      if (this.formDataSearch.value.semester === '1') {
        this.active = '1';
      } else {
        this.active = '2';
      }
    } else {
      this.active = '1';
    }
  }

  // Bắt giá trị thay đổi Khối để check Lớp
  changeValueGrade() {
    this.formDataSearch.controls.class.disable();
    this.resetClass.reset();
    this.formDataSearch.value.class = null;
    if (this.formDataSearch.value.gradeLevel) {
      this.formDataSearch.controls.class.enable();
      this.classroomService.getClassByGrade(this.formDataSearch.value.gradeLevel)
        .subscribe(data => {
          if (data) {
            this.listClassroom = data;
            this.formDataSearch.patchValue({class: this.listClassroom[0].id});
          }
        });
    } else {
      this.formDataSearch.controls.class.disable();
    }
  }

  // Bắt giá trị thay đổi Tổ bộ môn để check Giáo viên
  changeValueSchoolFaculty() {
    this.formDataSearch.controls.teacher.disable();
    this.resetTeacher.reset();
    this.formDataSearch.value.teacher = null;
    if (this.formDataSearch.value.schoolFaculty) {
      this.formDataSearch.controls.teacher.enable();
      this.loadingDropdownTeacher = true;
      this.employeeService.getEmployeeByFacultyId(this.formDataSearch.value.schoolFaculty).subscribe(data => {
        if (data){
          this.listEmployee = data;
          this.formDataSearch.patchValue({teacher: this.listEmployee[0].id});
        }
        this.loadingDropdownTeacher = false;
      }, error => {
        this.loadingDropdownTeacher = false;
      });
    } else {
      this.formDataSearch.controls.teacher.disable();
      this.resetSchoolFaculty.reset();
      this.formDataSearch.value.teacher = null;
    }
  }

  // Onclick Search
  submitSearchData() {
    this.dataOutput = {
      dataSearchSemester: this.formDataSearch.value.semester,
      dataSearchClass: this.formDataSearch.value.class,
      dataSearchSchoolFaculty: this.formDataSearch.value.schoolFaculty,
      dataSearchTeacher: this.formDataSearch.value.teacher,
      dataSearchActive: this.formDataSearch.value.active
    };
    console.log(this.dataOutput)
  }

}

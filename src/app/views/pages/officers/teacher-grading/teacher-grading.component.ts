import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Department} from '../../../../core/service/model/department.model';
import {SchoolFacultyService} from '../../../../core/service/service-model/school-faculty.service';
import {GradingComponent} from './grading/grading.component';
import {ProfessionalStandardService} from '../../../../core/service/service-model/professional-standard.service';
import {ProfessionalStandardModel} from '../../../../core/service/model/professional-standard.model';
import {JobGradingComponent} from './job-grading/job-grading.component';
import {AppState} from '../../../../core/reducers';
import {Observable} from 'rxjs';
import {CommonStore, SchoolFacultyModel} from '../../../../core/common';
import {Store} from '@ngrx/store';

@Component({
  selector: 'kt-teacher-grading',
  templateUrl: './teacher-grading.component.html',
  styleUrls: ['./teacher-grading.component.scss']
})
export class TeacherGradingComponent extends CommonStore implements OnInit {
  active = 1;
  isCollapsed = true;
  public form: FormGroup;
  schoolFaculty$: Observable<SchoolFacultyModel[]>;
  schoolFacultyLoaded$: Observable<boolean>;
  public schoolFaculity: Department = new Department();
  public chuanNgheNghiep: ProfessionalStandardModel;
  @ViewChild(JobGradingComponent) JobGrading: JobGradingComponent;
  @ViewChild(GradingComponent) Grading: GradingComponent;
  private defaultBomon = {facultyName: 'Tất cả', id: null};

  constructor(private schoolFacultyService: SchoolFacultyService,
              public store: Store<AppState>,
              private professionalStandard: ProfessionalStandardService,
              private fb: FormBuilder,) {
    super(store);
    this.form = this.fb.group({
      idSchoolFaculty: new FormControl(''),
      nameTeacher: new FormControl('')
    });

  }

  initCates() {
    // Danh mục loại cán bộ
    // this.employeesType$ = this.store.pipe(select(getCate, Category.DM_LOAI_CAN_BO), takeUntil(this.ngUnsubscribe));
    // this.employeesTypeLoaded$ = this.store.pipe(select(getCateLoaded, Category.DM_LOAI_CAN_BO), takeUntil(this.ngUnsubscribe));
  }

  ngOnInit(): void {
    this.initCates();
  }

  search() {
    if (this.active === 2) {
      this.JobGrading.search(this.form.value);
    } else {
      this.Grading.search(this.form.value);
    }
  }

  selectionByFaculity() {

  }
}

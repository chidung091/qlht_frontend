import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Department} from '../../../../core/service/model/department.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {SchoolFacultyService} from '../../../../core/service/service-model/school-faculty.service';
import {EmployeeService} from '../../../../core/service/service-model/employee.service';
import {ConcurrentWorkComponent} from './concurrent-work/concurrent-work.component';
import {InsteadWorkComponent} from './instead-work/instead-work.component';
import {locale} from '../../../../core/_config/i18n/vi';
import {AppState} from '../../../../core/reducers';
import {AllCategoriesRequested, Category, getCate} from '../../../../core/category';
import {EmployeeProfileModel} from '../../../../core/service/model/Employee-profile';
import {CategoryType} from '../../../../core/_constants';
import {CommonStore, SchoolFacultyModel} from '../../../../core/common';

import {select, Store} from '@ngrx/store';
import {ConcurrentWorkTypeService} from "../../../../core/service/service-model/concurrent-work-type.service";
import {ConcurrentWorkTypeModel} from "../../../../core/service/model/concurrent-work-type.model";

@Component({
  selector: 'kt-concurrent-work-assignment',
  templateUrl: './concurrent-work-assignment.component.html',
  styleUrls: ['./concurrent-work-assignment.component.scss']
})
export class ConcurrentWorkAssignmentComponent extends CommonStore implements OnInit {
  VI_LANG = locale.data;
  // defal: Category = new class implements Category {
  //   cateCode: string;
  //   cateCodeType: string;
  //   cateName: string;
  //   id: string;
  //   isActive: boolean;
  //   isHoatDong: number;
  //   parentCateCode: string;
  //   parentCateName: string;
  //   ref1: string;
  //   ref2: string;
  //   ref3: string;
  // }
  defal: ConcurrentWorkTypeModel = new class implements ConcurrentWorkTypeModel {
    creationTime: string;
    description: string;
    id: string;
    name: string;
    sectionPerWeek: number;
  }
  defalEmployee: EmployeeProfileModel = new EmployeeProfileModel();
  active = 1;
  isCollapsed = false;
  public loadCVKN = false;
  public loadEployeeWR: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  form: FormGroup;
  public listEmployeeWorkR: EmployeeProfileModel[] = [];
  public defaulSchooFaculty: SchoolFacultyModel = new SchoolFacultyModel();
  schoolFaculty$: Observable<SchoolFacultyModel[]>;
  schoolFacultyLoaded$: Observable<boolean>;

  @ViewChild(ConcurrentWorkComponent) concurrenWork: ConcurrentWorkComponent;
  @ViewChild(InsteadWorkComponent) insteadWork: InsteadWorkComponent;
  catalogCVKN$: Observable<Category[]>;
  listConcurentType: ConcurrentWorkTypeModel[] = [];

  constructor(
    private schoolFacultyService: SchoolFacultyService,
    private employeeService: EmployeeService,
    private concurrentWorkTypeService: ConcurrentWorkTypeService,
    public store: Store<AppState>,
  ) {
    super(store);
    this.defaulSchooFaculty.facultyName = 'Lựa chọn';
    this.defal.name = 'Lựa chọn';
    this.defalEmployee.fullName = 'Lựa chọn';
  }

  selectState() {
    this.catalogCVKN$ = this.store.pipe(select(getCate, CategoryType.DM_NHIEM_VU_KIEM_NHIEM));
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      idFaculty: new FormControl(''),
      cateCode: new FormControl(''),
      employeeID: new FormControl('')
    });
    // this.selectState();
    // this.loadSate();
    this.loadConcurent();
  }

  loadSate() {
    this.catalogCVKN$.subscribe(data => {
      if (!data || data.length === 0) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_NHIEM_VU_KIEM_NHIEM}));
      } else {
      }
    })
  }

  search() {
    if (this.active === 1) {
      this.concurrenWork.search(this.form.value);
    } else {
      this.insteadWork.search(this.form.value);
    }
  }

  resetForm() {
    this.form.patchValue({
      idFaculty: undefined,
      cateCode: undefined,
      employeeID: undefined
    })
    this.listEmployeeWorkR = [];
  }

  loadEmployeeWR() {
    this.form.patchValue({
      employeeID: undefined
    })
    this.loadEployeeWR.next(true);
    if (this.form.value.idFaculty) {
      this.employeeService.getEmployeeByFacultyId(this.form.value.idFaculty).subscribe(data => {
        this.listEmployeeWorkR = data;
        this.loadEployeeWR.next(false);
      }, error => {
        this.loadEployeeWR.next(false);
      })
    } else {
      this.listEmployeeWorkR = [];
      this.form.patchValue({
        idFaculty: undefined
      })
      this.loadEployeeWR.next(false);
    }
  }

  loadConcurent(){
    this.loadCVKN = true;
    this.concurrentWorkTypeService.getAllCon().subscribe(data => {
      if(data){
        this.listConcurentType = data;
        this.loadCVKN = false;
      }
    }, error => {
      this.loadCVKN = false;
    })
  }

}

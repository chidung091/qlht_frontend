import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CommonStore, SchoolFacultyModel} from '../../../../core/common';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/reducers';
import {ManagementModel} from '../../../../core/service/model/management.model';
import {BehaviorSubject, concat, forkJoin, merge, Observable} from 'rxjs';
import {AssignmentMinistryService} from './assignment-ministry.service';
import {DropDownListComponent} from '@progress/kendo-angular-dropdowns';
import {SupervisorRoleModel} from './model/supervisor-role.model';
import {ClassroomModel} from '../../../../core/service/model/classroom.model';
import {Category} from '../../../../core/category';
import {SmasContextService} from '../../../../core/_base/layout';
import {map, mergeMap} from 'rxjs/operators';
import {AssignmentMinistryModel} from './model/assignment-ministry.model';
import {NotiService} from '../../../../core/service/service-model/notification.service';
import {Year} from '../../../../core/year';
import {locale} from '../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-assignment-ministry',
  templateUrl: './assignment-ministry.component.html',
  styleUrls: ['./assignment-ministry.component.scss']
})
export class AssignmentMinistryComponent extends CommonStore implements OnInit {
  VI_LANG = locale.data;

  isCollapsed = true;

  defaultSchoolFaculty: SchoolFacultyModel = {id: null, facultyName: 'Lựa chọn'}
  selectSchoolFaculty: SchoolFacultyModel;

  employees: Observable<ManagementModel[]>;
  employeesLoaded = new BehaviorSubject<boolean>(true);
  defaultEmployee: ManagementModel = {id: null, fullName: 'Lựa chọn'}
  selectEmployee: ManagementModel;
  @ViewChild('employee') employeeDropdown: DropDownListComponent;
  isDisableDropdown = true;

  gradePickNumber = 0;
  selectGrade: Category;

  selectYear: Year;

  supervisorRole: Observable<SupervisorRoleModel[]>;

  classRoom$: Observable<ClassroomModel[]>;
  classRoom: ClassroomModel[];
  numOfClass: number;

  listPermission: AssignmentMinistryModel[] = [];

  isLoaded = new BehaviorSubject<boolean>(true);

  constructor(
    public store: Store<AppState>,
    private service: AssignmentMinistryService,
    private smasContextService: SmasContextService,
    private notiService: NotiService,
    private cdr: ChangeDetectorRef,
  ) {
    super(store);
  }

  ngOnInit(): void {
    this.selectSchoolFaculty = this.defaultSchoolFaculty;
    this.selectEmployee = this.defaultEmployee;
    this.getData();

    this.gradeLoaded$.subscribe(vl => {
      this.isLoaded.next(vl)
    })
  }

  changeSchoolFaculty() {
    this.employeeDropdown.reset();
    this.employeesLoaded.next(false);
    this.employees = this.service.getManagementBySchoolFaculty(this.selectSchoolFaculty.id)
    // TODO subscribe call two times
    this.employees.subscribe((value) => {
      this.isDisableDropdown = !value || value.length === 0
      this.employeesLoaded.next(true);
    })
  }

  changeGrade(item, index) {
    this.gradePickNumber = index;
    this.selectGrade = item;
    this.getDataClassRoom();
    this.cdr.markForCheck();
  }

  getData() {
    this.grade$.subscribe(value => {
      if (value) {
        this.selectGrade = value[this.gradePickNumber];
        this.getDataClassRoom();
      }
    })

    this.supervisorRole = this.service.getSupervisorRole();

  }

  getDataClassRoom() {
    this.isLoaded.next(false);
    this.smasContextService.yearUpdate$.subscribe(value => {
      if (value.code && this.selectGrade) {
        this.selectYear = value;
        this.classRoom$ = this.service.getClassByGradeAndYear(this.selectGrade.cateCode, this.smasContextService.getSmasConText().year.id)
          .pipe(map((classRoom) => {
            this.numOfClass = classRoom.length;
            this.classRoom = classRoom;
            this.isLoaded.next(true);
            return classRoom
        }))
      } else {
        this.classRoom$ = new Observable<ClassroomModel[]>()
      }
    })

    this.getDataAssignmentMinistry()

  }

  changeCheckbox(event: any, item: any, column: any, isHeader?: boolean) {
    if (isHeader){
       const checkAllStatus = this.changeCheckAll(column);
        this.classRoom.forEach((classRoomItem)=>{
          const indexData = this.listPermission.find(permission=> permission.classRoomId === classRoomItem.id && permission.roleId === column.id)
          if(indexData !== undefined) {
            indexData.isGranted = !checkAllStatus;
          } else {
            this.listPermission.push(new AssignmentMinistryModel(null,null,null,null,null,null, null,classRoomItem.id,classRoomItem.className,column.id,column.remark,!checkAllStatus));
          }
        })
    } else {
      const indexData = this.listPermission.find(permission=> permission.classRoomId === item.id && permission.roleId === column.id)
      if(indexData !== undefined) {
        indexData.isGranted = !indexData.isGranted;
      } else {
        this.listPermission.push(new AssignmentMinistryModel(null,null,null,null,null,null, null,item.id,item.className,column.id,column.remark,true));
      }
    }
    this.cdr.markForCheck();
  }

  changeCheckAll(column: any) {
    const listClassChecked = this.listPermission.filter(value => {
      if (value.isGranted && value.roleId === column.id){
        return value;
      }
    })

    if (listClassChecked.length === this.numOfClass && this.numOfClass === 0) {
      return false;
    } else return listClassChecked.length === this.numOfClass;
  }


  checkChecked(classId: string, roleId: string){
    const indexData = this.listPermission.find(permission=> permission.classRoomId === classId && permission.roleId === roleId)
    if(indexData !== undefined) {
      return indexData.isGranted;
    } else {
      return false;
    }
  }

  getDataAssignmentMinistry() {
    if (this.selectEmployee.id && this.selectYear.id && this.selectGrade.cateCode) {
      this.isLoaded.next(false)
      this.service.getAssignmentMinistryByGrade(this.selectEmployee.id, this.selectYear.id, this.selectGrade.cateCode).subscribe(value => {
        this.listPermission = value;
        this.cdr.markForCheck();
        this.isLoaded.next(true)
      })
    } else {
      this.listPermission = [];
    }
  }

  submit() {
    if (this.selectEmployee.id === null) {
      this.notiService.fillFullInfoWarning();
    } else {
      this.isLoaded.next(false);
      this.listPermission.forEach(value => {
        value.employeeId = this.selectEmployee.id;
        value.employeeName = this.selectEmployee.fullName;
        value.gradeLevelCode = this.selectGrade.cateCode;
        value.gradeLevelName = this.selectGrade.cateName;
        value.schoolYearId = this.selectYear.id;
        value.schoolYearName = this.selectYear.code;
      })

      this.service.updateAssignmentMinistry(this.listPermission).subscribe(value => {
        this.isLoaded.next(true);
        this.notiService.updateSuccess();
      })
    }
  }
}

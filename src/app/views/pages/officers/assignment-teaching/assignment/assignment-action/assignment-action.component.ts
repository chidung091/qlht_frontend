import {Component, OnInit, ViewChildren} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {locale} from '../../../../../../core/_config/i18n/vi';
import {Store} from '@ngrx/store';
import {map, takeUntil} from 'rxjs/operators';
import {AppState} from '../../../../../../core/reducers';
import {ClassroomService} from '../../../../../../core/service/service-model/classroom.service';
import {CommonStore, GetAllSchoolFaculty} from '../../../../../../core/common';
import {GetSubjectModel} from '../../../../../../core/service/model/subject.model';
import {FormControl, FormGroup} from '@angular/forms';
import {EmployeeService} from '../../../../../../core/service/service-model/employee.service';
import {EmployeeProfileModel} from '../../../../../../core/service/model/Employee-profile';
import {AutoCompleteComponent} from '@progress/kendo-angular-dropdowns';
import { Category } from 'src/app/core/category';
import { Observable } from 'rxjs';

export interface Item {
  id?: string;
  name: string;
  code?: string;
}

@Component({
  selector: 'kt-assignment-action',
  templateUrl: './assignment-action.component.html',
  styleUrls: ['./assignment-action.component.scss']
})
export class AssignmentActionComponent extends CommonStore implements OnInit {

  public items$: Observable<Item[]>;

  defaultItem: {id: string, value: string} = {id: null, value: 'Lựa chọn'};
  defaultSchoolFaculty: {id: string, facultyName: string} = {id: null, facultyName: 'Lựa chọn'};
  pageSizes: Array<number> = [5, 10, 20];
  _pageSize = 5;
  pageSize = 10;
  skip = 0;
  gridView: GridDataResult;
  mySelection: string[] = [];
  VI_LANG = locale.data;
  selectedKeys: any[] = ['0'];
  dataSearchSubject: GetSubjectModel;
  listDataGrid: any[] = [];
  formData: FormGroup;
  listEmployee: EmployeeProfileModel[];
  listEmployeeFilter: EmployeeProfileModel[];
  @ViewChildren('autoCompleteEmployee') autoCompleteEmployee: AutoCompleteComponent;
  NO_DATA = 'Không có dữ liệu';

  constructor(
    private activeModal: NgbActiveModal,
    private store$: Store<AppState>,
    private classroomService: ClassroomService,
    private employeeService: EmployeeService
  ) {
    super(store$);
  }

  ngOnInit(): void {
    this.items$ = this.grade$.pipe(
      map((grades: any) => {
        return grades.map(grade => {
          return {
            code: grade?.cateCode,
            name: grade?.cateName
          } as Item;
        })
      })
    )


    this.initForm();
  }

  initForm() {
    this.formData = new FormGroup({
      class: new FormControl(''),
      subject: new FormControl(''),
      schoolFaculty: new FormControl(''),
      teacher: new FormControl(''),
    });
  }

  // Tổ bộ môn
  initCates() {
    // this.schoolFaculty$ = this.store$.pipe(select(getAllSchoolFaculty), takeUntil(this.ngUnsubscribe));
    // this.schoolFacultyLoader$ = this.store$.pipe(select(isAllSchoolFacultyLoaded), takeUntil(this.ngUnsubscribe));
  }

  // Tổ bộ môn
  fetchSchoolFaculty(): void {
    this.schoolFaculty$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if(!data) {
        this.store$.dispatch(new GetAllSchoolFaculty());
      }
    })
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
  }

  onChange(row: any): void{
    this.mySelection = row;
  }

  // Get All Class
  async getAllClassByGrade() {
    await this.grade$.subscribe(async () => {
      // for(const item of gradeResponse ){
      //   const dataRes = {...item};
      //   dataRes['className'] = item.cateName;
      //   dataRes['items'] = await this.classroomService.GetClassByGradeAndYear(item.cateCode, this.smasContextModel.year.code).toPromise();
      //   this.listContextGrade.push(dataRes);
      // }
    });
  }

  getClazzsByGrade() {

  }

  gradeSelect(event: any) {
    // console.log(event?.item);



    // while (this.listDataGrid.length) {
    //   this.listDataGrid.pop();
    // }
    // if (data.item.dataItem.cateCodeType) {
    //   this.NO_DATA = 'Không có dữ liệu, mời bạn chọn lớp để thêm mới'
    // } else {
    //   this.dataSearchSubject = {
    //     blockCode: null,
    //     classId: data.item.dataItem.id,
    //     schoolYear: this.smasContextModel.year.code,
    //     schoolLevelCode: this.smasContextModel.level.schoolLevelCode,
    //     sorting: null,
    //     skipCount: 0,
    //     maxResultCount: 10
    //   }
    //   this.subjectService.getSubjectByClass(this.dataSearchSubject).subscribe(dataResponse => {
    //     for(const item of dataResponse.items) {
    //       const dataSub = {...item};
    //       dataSub['classId'] = item.classId;
    //       dataSub['className'] = data.item.dataItem.className;
    //       dataSub['subjectId'] = item.subjectId;
    //       dataSub['subjectName'] = item.subjectName;
    //       this.listDataGrid.push(dataSub);
    //     }
    //   });
    //   if (this.listDataGrid) {
    //     this.NO_DATA = 'Không có dữ liệu';
    //   }
    // }
  }

  public hasChildren = (item: Item) => 'name' in item;
  public fetchChildren = (item: Item) => {
    return this.classroomService.getClassByGrade(item.code).pipe(map((clazzs: any) => {
      return clazzs.map(clazz => {
        return {
          id: clazz.id,
          code: clazz?.classCodeType,
          name: clazz?.className
        } as Item;
      })
    }));
  }

  // fetchChildren = (item: any): Observable<any[]> => {
  // return this.classroomService.getClassByGrade(item);
  // return Observable.create(observer => {
  //     const categoryListPromise = this.classroomService.getClassByGrade('').then(result => {
  //         observer.next(result.records);
  //     });
  // });
  // };

  changeSchoolFaculty() {
    this.listEmployee = [];
    this.listEmployeeFilter = [];
    this.employeeService.getEmployeeByFacultyId(this.formData.value.schoolFaculty).subscribe(data => {
      if (data) {
        this.listEmployee = data;
      }
    }, error => {
      console.log(error)
    })
  }

  handleFilter(event) {
    this.listEmployeeFilter = this.listEmployee.filter((data) => data.fullName.toLocaleLowerCase().indexOf(event.toLocaleLowerCase())!==-1);
  }
}

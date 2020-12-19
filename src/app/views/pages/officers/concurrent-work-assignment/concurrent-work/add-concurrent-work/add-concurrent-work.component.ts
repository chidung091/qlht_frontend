import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Observable} from 'rxjs';
import {Department} from '../../../../../../core/service/model/department.model';
import {ConcurrentWorkAssigmentService} from '../../../../../../core/service/service-model/concurrent-work-assigment.service';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {SchoolFacultyService} from '../../../../../../core/service/service-model/school-faculty.service';
import {
  AddingConcurrentWorkAssignmentModel,
  ConcurrentWorkAssignmentAdd
} from "../../../../../../core/service/model/concurrent-work-assignment.model";
import {NotiService} from "../../../../../../core/service/service-model/notification.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {locale} from "../../../../../../core/_config/i18n/vi";
import {AllCategoriesRequested, Category, getCate} from "../../../../../../core/category";
import {Store as StoreRx} from "@ngrx/store";
import {AppState} from "../../../../../../core/reducers";
import {DropDownListComponent} from "@progress/kendo-angular-dropdowns";
import {ConcurrentWorkTypeService} from "../../../../../../core/service/service-model/concurrent-work-type.service";
import {ConcurrentWorkTypeModel} from "../../../../../../core/service/model/concurrent-work-type.model";
import {CommonStore, SchoolFacultyModel} from "../../../../../../core/common";

@Component({
  selector: 'kt-add-concurrent-work',
  templateUrl: './add-concurrent-work.component.html',
  styleUrls: ['./add-concurrent-work.component.scss']
})
export class AddConcurrentWorkComponent extends CommonStore implements OnInit, AfterViewInit {
  VI_LANG = locale.data;
  schoolFaculty$: Observable<SchoolFacultyModel[]>;
  schoolFacultyLoaded$: Observable<boolean>;
  defal: ConcurrentWorkTypeModel = new class implements ConcurrentWorkTypeModel {
    creationTime: string;
    description: string;
    id: string;
    name: string;
    sectionPerWeek: number;
  }
  public listSchoolFaculty$: Observable<Department[]>;
  public list
  public loadingFaculty: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public boolFaculty = true;
  public listFacullty: Department[] = [];
  public defaulSchooFaculty: Department = new Department();
  public loadCVKN = true;
  public cateCode = '';
  public idSchoolFaculty = '';
  public skip = 0;
  public _pageSize = 5;
  public gridView: GridDataResult;
  public boolPage = false;
  public buttonCount = 5;
  public mySelection: string[] = [];
  public addingConcurrent: AddingConcurrentWorkAssignmentModel;
  public bool = false;
  public form: FormGroup;
  boolSave = false;
  boolSemes = false;
  boolList = false;
  semesterList = [
    {
      text: 'Học kỳ 1',
      value: 1
    },
    {
      text: 'Học kỳ 2',
      value: 2
    },
    {
      text: 'Cả năm',
      value: 3
    },
  ]
  defauSemes = {
    text: 'Lựa chọn',
    value: ''
  }
  @Input() schoolYear: any;
  @ViewChild('concurent') concurent: DropDownListComponent;
  @ViewChild('faculity') faculity: DropDownListComponent;

  catalogCVKN$: Observable<Category[]>
  listConcurentType: ConcurrentWorkTypeModel[] = [];

  constructor(public activeModal: NgbActiveModal,
              private concurrentWorkAssigmentService: ConcurrentWorkAssigmentService,
              private schoolFacultyService: SchoolFacultyService,
              private concurrentWorkTypeService: ConcurrentWorkTypeService,
              private notiService: NotiService,
              private storeRx: StoreRx<AppState>,
  ) {
    super(storeRx);
    this.defaulSchooFaculty.facultyName = 'Lựa chọn';
    this.defal.name = 'Lựa chọn';
    this.form = new FormGroup({
      cateCode: new FormControl('', [Validators.required]),
      semester: new FormControl('', [Validators.required]),
      idFaculty: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    this.loadConcurent();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.concurent.focus()
    }, 10)
  }

  close() {
    this.activeModal.dismiss('click-close')
  }

  // lấy thông tin tiềm kiếm
  public loadDataInfor() {
    this.loadingFaculty.next(true);
    this.schoolFacultyService.getAllDepartMent().subscribe(data => {
      this.listFacullty = data.items;
      this.loadingFaculty.next(false);
    }, error => {
      this.loadingFaculty.next(false);
    })
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadData();
  }

  public okAdd(status) {
    this.boolSave = true;
    if (this.form.valid && !this.boolSemes) {
      this.bool = true;
      this.addingConcurrent = new AddingConcurrentWorkAssignmentModel();
      this.addingConcurrent.employeeIds = this.mySelection;
      this.addingConcurrent.concurrentWorkAssignment = new ConcurrentWorkAssignmentAdd();
      const index = this.listConcurentType.findIndex(item => item.id === this.form.value.cateCode);
      if(index > -1){
        this.addingConcurrent.concurrentWorkAssignment.concurrentworkTypeId = this.form.value.cateCode;
        this.addingConcurrent.concurrentWorkAssignment.concurrentworkTypeName = this.listConcurentType[index].name;
        this.addingConcurrent.concurrentWorkAssignment.sectionPerWeek = this.listConcurentType[index].sectionPerWeek;
      }
      this.addingConcurrent.concurrentWorkAssignment.facultyId = this.form.value.idFaculty;
      this.schoolFaculty$.subscribe(data => {
        const indexS = data.findIndex(item => item.id === this.form.value.idFaculty);
        this.addingConcurrent.concurrentWorkAssignment.facultyName = data[indexS].facultyName;
      })
      this.addingConcurrent.concurrentWorkAssignment.semester = this.form.value.semester;
      this.addingConcurrent.concurrentWorkAssignment.schoolYear = this.schoolYear.code;
      this.addingConcurrent.concurrentWorkAssignment.schoolYearId = this.schoolYear.id;
      if (this.mySelection.length > 0) {
        this.concurrentWorkAssigmentService.addConcurrentWorkAssi(this.addingConcurrent).subscribe(() => {
          this.notiService.createSuccess();
          this.bool = false;
          this.activeModal.close();
        }, error => {
          this.bool = false;
          this.activeModal.close();
        })
      } else {
        this.bool = false;
        this.boolList = true;
        // this.close();
      }
    } else {
      this.form.markAllAsTouched();
      switch ('') {
        case this.form.value.cateCode:
          this.concurent.focus();
          break;
        case this.form.value.idFaculty:
          this.faculity.focus();
          break;
      }
      this.boolSave = false;
    }
  }


  public loadData() {
    if (this.form.value.cateCode && this.form.value.idFaculty) {
      this.boolPage = true;
      this.concurrentWorkAssigmentService.
      getOfficesFolowInfor(this.schoolYear.code, this.form.value.idFaculty, this.form.value.cateCode, this._pageSize, this.skip).
      subscribe(datas => {
        this.gridView = ({
          data: datas.items,
          total: datas.totalCount
        });
        this.boolPage = false;
      });
    } else {
      this.skip = 0;
      this.gridView = ({
        data: [],
        total: 0
      })
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
  checkSemes(){
    if(!this.form.value.semester1 && !this.form.value.semester2){
      this.boolSemes = true;
    }else {
      this.boolSemes = false;
    }
  }
  checkList(){
    if(this.mySelection.length === 0){
      this.boolList = true;
    }
  }
}

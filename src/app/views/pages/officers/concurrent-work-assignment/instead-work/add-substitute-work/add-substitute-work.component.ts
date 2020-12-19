import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WorkReplacementModel} from '../../../../../../core/service/model/work-replacement.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Department} from '../../../../../../core/service/model/department.model';
import {Observable} from 'rxjs';
import {SchoolFacultyService} from '../../../../../../core/service/service-model/school-faculty.service';
import {WorkReplacementService} from '../../../../../../core/service/service-model/work-replacement.service';
import {EmployeeService} from '../../../../../../core/service/service-model/employee.service';
import {NotiService} from "../../../../../../core/service/service-model/notification.service";
import {EmployeeProfileModel} from "../../../../../../core/service/model/Employee-profile";
import {Store as StoreRx} from "@ngrx/store";
import {AppState} from "../../../../../../core/reducers";
import {DatePipe} from "@angular/common";
import {locale} from "../../../../../../core/_config/i18n/vi";
import {DropDownListComponent} from "@progress/kendo-angular-dropdowns";
import {ConcurrentWorkTypeService} from "../../../../../../core/service/service-model/concurrent-work-type.service";
import {ConcurrentWorkTypeModel} from "../../../../../../core/service/model/concurrent-work-type.model";
import {CommonStore, SchoolFacultyModel} from "../../../../../../core/common";

@Component({
  selector: 'kt-add-substitute-work',
  templateUrl: './add-substitute-work.component.html',
  styleUrls: ['./add-substitute-work.component.scss']
})
export class AddSubstituteWorkComponent extends CommonStore implements OnInit, AfterViewInit {
  VI_LANG = locale.data;
  schoolFaculty$: Observable<SchoolFacultyModel[]>;
  schoolFacultyLoaded$: Observable<boolean>;
  defalCatalog: ConcurrentWorkTypeModel = new class implements ConcurrentWorkTypeModel {
    creationTime: string;
    description: string;
    id: string;
    name: string;
    sectionPerWeek: number;
  }
  defalFaculty: Department = new Department();
  defalEmployee: EmployeeProfileModel = new EmployeeProfileModel();
  public value: Date;
  public data: any;
  @Input() title: string;
  @Input() workReplacement: WorkReplacementModel;
  public form: FormGroup;
  public disableCVBM = false;

  @ViewChild('workR') workR: DropDownListComponent;
  @ViewChild('faculity') faculity: DropDownListComponent;
  @ViewChild('employeeC') employeeC: DropDownListComponent;
  @ViewChild('employeeI') employeeI: DropDownListComponent;
  @ViewChild('dateTo') dateTo: ElementRef;
  @ViewChild('dateFrom') dateFrom: ElementRef;

  // loadinfor
  public loadingFaculty = true;
  public listFacullty: Department[] = [];
  public listEmployeeConcurrent: EmployeeProfileModel[] = [];
  public listEmployeeWorkR: EmployeeProfileModel[] = [];
  public loadCVKN = true;
  public loadEplyoeeC = false;
  public datas: any;
  public loadEployeeWR = false;
  public boolLoading = false;
  public boolSubmit = false;
  // timePicker
  public format = 'dd/MM/yyyy';
  listConcurentType: ConcurrentWorkTypeModel[] = [];

  @Input() schoolYear: string;

  constructor(public activeModal: NgbActiveModal,
              private schoolFacultyService: SchoolFacultyService,
              private workReplacementService: WorkReplacementService,
              private concurrentWorkTypeService: ConcurrentWorkTypeService,
              private employeeService: EmployeeService,
              private notiService: NotiService,
              private storeRx: StoreRx<AppState>,
              private datepie: DatePipe) {
    super(storeRx);
    this.defalCatalog.name = 'Lựa chọn';
    this.defalCatalog.id = '';
    this.defalEmployee.fullName = 'Lựa chọn';
    this.defalFaculty.facultyName = 'Lựa chọn';
    this.defalFaculty.id = '';
    this.defalEmployee.id = '';
  }

  ngOnInit(): void {
    this.creatForm();
    if (this.workReplacement.id) {
      this.disableCVBM = true;
      this.loadEmployeeConcurrent();
      this.loadEmployeeWR();
    }
    this.loadConcurent();
  }

  ngAfterViewInit() {
    if (this.workReplacement.employeeConcurrentId) {
      setTimeout(() => {
        this.faculity.focus()
      }, 10)
    } else {
      setTimeout(() => {
        this.workR.focus()
      }, 10)
    }
  }

  close() {
    this.activeModal.dismiss('click-close')
  }

  creatForm() {
    this.form = new FormGroup({
      workCode: new FormControl(this.workReplacement.workCode, [Validators.required]),
      employeeConcurrentId: new FormControl(this.workReplacement.employeeConcurrentId, [Validators.required]),
      employeeReplaceId: new FormControl(this.workReplacement.employeeReplaceId, [Validators.required]),
      facultyId: new FormControl(this.workReplacement.facultyId, [Validators.required]),
      dateFrom: new FormControl(this.workReplacement.dateFrom ? new Date(this.workReplacement.dateFrom) : '', [Validators.required]),
      dateTo: new FormControl(this.workReplacement.dateTo ? new Date(this.workReplacement.dateTo) : '', [Validators.required]),
      note: new FormControl(this.workReplacement.note)
    });
  }

  // lay can bo theo cv kiem nhiem
  loadEmployeeConcurrent() {
    if (this.form.value.workCode) {
      this.loadEplyoeeC = true;
      this.workReplacementService.getEmployeeByConcurrent(this.schoolYear, this.form.value.workCode).subscribe(data => {
        this.listEmployeeConcurrent = data;
        this.loadEplyoeeC = false;
      }, error => {
        this.loadEplyoeeC = false;
      });
    } else {
      this.form.patchValue({
        employeeConcurrentId: ''
      })
      this.listEmployeeConcurrent = [];
    }
  }
  // load can bo theo to bo mon
  loadEmployeeWR() {
    if (this.form.value.facultyId) {
      this.loadEployeeWR = true;
      this.employeeService.getEmployeeByFacultyId(this.form.value.facultyId).subscribe(data => {
        this.listEmployeeWorkR = data.filter(item => item.id !== this.form.value.employeeConcurrentId);
        this.loadEployeeWR = false;
      }, error => {
        this.loadEployeeWR = false
      })
    } else {
      this.listEmployeeWorkR = [];
      this.loadEployeeWR = false;
      this.form.patchValue({
        employeeConcurrentId: ''
      });
    }
  }

  // action sbmit
  submit() {
    this.boolSubmit = true;
    if (this.form.valid && this.form.value.dateFrom <= this.form.value.dateTo) {
      this.createData();
      if (this.workReplacement.id) {
        this.okEdit();
      } else {
        this.okAdd();
      }
    } else {
      this.form.markAllAsTouched();
      this.boolSubmit = false;
      switch ('') {
        case this.form.value.workCode:
          this.workR.focus();
          break;
        case this.form.value.employeeConcurrentId:
          this.employeeC.focus();
          break;
        case this.form.value.facultyId:
          this.faculity.focus();
          break;
        case this.form.value.employeeReplaceId:
          this.employeeI.focus();
          break;
      }
    }
  }

  okAdd() {
    this.boolLoading = true;
    this.workReplacementService.addWorkRelacementByPage(this.workReplacement).subscribe(() => {
      this.boolSubmit = false;
      this.boolLoading = false;
      this.activeModal.close();
      this.notiService.createSuccess();
    }, error => {
      this.boolSubmit = false;
      this.boolLoading = false;
      this.close();
    })
  }

  okEdit() {
    this.boolLoading = true;
    this.workReplacementService.editWorkRelacementByPage(this.workReplacement).subscribe(() => {
      this.boolLoading = false;
      this.activeModal.close();
      this.notiService.updateSuccess();
      this.boolSubmit = false;
    }, error => {
      this.boolSubmit = false;
      this.boolLoading = false;
      this.close();
    })
  }

  createData() {
    let index;
    this.workReplacement.workCode = this.form.value.workCode;
    index = this.listConcurentType.findIndex(item => item.id === this.form.value.workCode);
    this.workReplacement.workName = this.listConcurentType[index].name;
    this.workReplacement.sectionPerWeek = this.listConcurentType[index].sectionPerWeek;
    this.workReplacement.employeeConcurrentId = this.form.value.employeeConcurrentId;
    index = this.listEmployeeConcurrent.findIndex(item => item.id === this.form.value.employeeConcurrentId);
    this.workReplacement.employeeConcurrentName = this.listEmployeeConcurrent[index].fullName;
    this.workReplacement.facultyId = this.form.value.facultyId;
    this.schoolFaculty$.subscribe(data => {
      index = data.findIndex(item => item.id === this.form.value.facultyId);
      this.workReplacement.facultyName = data[index].facultyName;
    })
    this.workReplacement.employeeReplaceId = this.form.value.employeeReplaceId;
    index = this.listEmployeeWorkR.findIndex(item => item.id === this.form.value.employeeReplaceId);
    this.workReplacement.employeeReplaceName = this.listEmployeeWorkR[index].fullName;
    this.workReplacement.dateFrom = this.datepie.transform(this.form.value.dateFrom, 'yyyy/MM/dd');
    this.workReplacement.dateTo = this.datepie.transform(this.form.value.dateTo, 'yyyy/MM/dd');
    this.workReplacement.note = this.form.value.note;
    this.workReplacement.schoolYear = this.schoolYear;
  }

  resetEC() {
    this.form.patchValue({
      employeeConcurrentId: ''
    });
  }

  disabledDates = (date: Date): boolean => {
    return date < new Date(this.form.value.dateFrom);
  }

  resetWorkR() {
    this.form.patchValue({
      employeeReplaceId: ''
    });
    // khi chọn tổ bộ môn trước, xong mới chọn cv kiêm nhiệm, và cán bộ kn thuộc cùng tổ bộ môn đó
    if (this.listEmployeeWorkR.length > 0) {
      this.listEmployeeWorkR = this.listEmployeeWorkR.filter(item => item.id !== this.form.value.employeeConcurrentId);
    }
  }

  selectEmploye(){
    this.resetWorkR();
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

import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AddConcurrentWorkComponent} from './add-concurrent-work/add-concurrent-work.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngxs/store';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GetCatalog} from '../../../../../core/service/actions/catalog.action';
import {SmasContextService} from '../../../../../core/_base/layout';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {
  ConcurrentWorkAssignmentModel,
  ItemConcurrentWorkAssignmentModel
} from '../../../../../core/service/model/concurrent-work-assignment.model';
import {ConcurrentWorkAssigmentService} from '../../../../../core/service/service-model/concurrent-work-assigment.service';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {Policies} from '../../../../../core/_constants/policy.constants';
import {AllCategoriesRequested, Category, getCate} from '../../../../../core/category';
import {select} from '@ngrx/store';
import {Store as StoreRx} from '@ngrx/store';
import {AppState} from '../../../../../core/reducers';
import {locale} from '../../../../../core/_config/i18n/vi';
import {CategoryType} from '../../../../../core/_constants';
import {SmasConText} from 'src/app/core/_base/layout/models/smas-context.model';
import {takeUntil} from 'rxjs/operators';
import {NgUnsubscribe} from "../../../../shared/directives";
import {ConcurrentWorkTypeModel} from "../../../../../core/service/model/concurrent-work-type.model";
import {ConcurrentWorkTypeService} from "../../../../../core/service/service-model/concurrent-work-type.service";

const stringCatalog = 'DM_NHIEM_VU_KIEM_NHIEM';

const createFormGroup = dataItem => new FormGroup({
  id: new FormControl(dataItem.id),
  toBoMonId: new FormControl(dataItem.toBoMonId, Validators.required),
  tenToBoMon: new FormControl(dataItem.tenToBoMon),
  congViecId: new FormControl(dataItem.congViecId, Validators.required),
  CategoryID: new FormControl(dataItem.CategoryID, Validators.required)
});

// congViecId: new FormControl(dataItem.congViecId, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),

@Component({
  selector: 'kt-concurrent-work',
  templateUrl: './concurrent-work.component.html',
  styleUrls: ['./concurrent-work.component.scss']
})
export class ConcurrentWorkComponent extends NgUnsubscribe implements OnInit {

  VI_LANG = locale.data;
  ConcurrentWorkCreate: string = Policies.CATEGORYMANAGEMENT_CONCURRENTWORKTYPE_CREATE;
  ConcurrentWorkEdit: string = Policies.CATEGORYMANAGEMENT_CONCURRENTWORKTYPE_EDIT;
  ConcurrentWorkDelete: string = Policies.CATEGORYMANAGEMENT_CONCURRENTWORKTYPE_DELETE;

  public _pageSize = 5;
  public skip = 0;
  public pageSizes: Array<number> = [5, 10, 20];
  public buttonCount = 5;
  private editedRowIndex: number;
  public formData: FormGroup;
  public loadCVKN = true;
  public loadingPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public boolPage = true;
  public gridView: GridDataResult;
  public listDatas: Observable<ItemConcurrentWorkAssignmentModel>;
  public mySelection: string[] = [];
  public delAllbtn = true;
  public openDel = false;
  public saveConcurrent: ConcurrentWorkAssignmentModel = new ConcurrentWorkAssignmentModel();
  public facultyID: string;
  public employeeID: string;
  public cateCode: string;
  public boolSave = true;
  public okLoadingDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public boolDelete = false;
  public checkYearFlag = null;

  // year
  date = new Date();
  destroy$ = new Subject<void>();
  public dataJobs: Category[] = [];
  public dataConcurrent: ConcurrentWorkTypeModel[] = [];

  textCV: any;
  dataFilter: SmasConText;
  checkLoadData = undefined;

  // công việc kiêm nhiệm
  listConcurentType: ConcurrentWorkTypeModel[] = [];

  @Input() inforFind: any;
  catalogCVKN$: Observable<Category[]>
  @ViewChild('deleteOk') deleteOk: ElementRef;

  semesterList = [
    {
      text: 'Học kỳ 1',
      code: 1
    },
    {
      text: 'Học kỳ 2',
      code: 2
    },
    {
      text: 'Cả năm',
      code: 3
    },
  ]

  constructor(public dialog: NgbModal, public store: Store,
              private smasContextService: SmasContextService,
              private concurrentWorkAssigmentService: ConcurrentWorkAssigmentService,
              private concurrentWorkTypeService: ConcurrentWorkTypeService,
              private notiService: NotiService,
              private storeRx: StoreRx<AppState>) {
    super();
    this.smasContextService.onConfigUpdated$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.dataFilter = smasContextService.getSmasConText();
      if(this.dataFilter.year.code){
        this.getYear();
      }
    });
  }

  ngOnInit(): void {
    this.dataFilter = this.smasContextService.getSmasConText();
    if(this.dataFilter.year){
      this.loadData();
    }
    this.loadConcurent();
  }
  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadData();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddConcurrentWorkComponent, {
      size: 'lg',
      centered:true
    });
    dialogRef.componentInstance.schoolYear = this.dataFilter.year;
    dialogRef.result.then(() => {
      this.skip = 0;
      this.loadData();
    }).catch(error1 => {
    })
  }

  public editHandler({sender, rowIndex, dataItem}) {
    this.boolSave = true;
    this.closeEditor(sender);
    this.formData = new FormGroup({
      concurrentworkTypeName: new FormControl(dataItem.concurrentworkTypeName),
      semester: new FormControl(dataItem.semester)
    });
    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formData);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formData = undefined;
  }

  public saveHandler({sender, rowIndex, formGroup, isNew}) {
    this.boolPage = true;
    const index = rowIndex % this._pageSize;
    this.textCV = formGroup.value;
    this.saveConcurrent = this.gridView.data[index];
    const indexConcurrent = this.dataConcurrent.findIndex(item => item.name === this.textCV.concurrentworkTypeName);
    if(indexConcurrent > -1){
      this.saveConcurrent.concurrentworkTypeId = this.dataConcurrent[indexConcurrent].id;
      this.saveConcurrent.concurrentworkTypeName = this.dataConcurrent[indexConcurrent].name;
      this.saveConcurrent.sectionPerWeek = this.dataConcurrent[indexConcurrent].sectionPerWeek;
    }
    this.saveConcurrent.semester = this.textCV.semester
    this.concurrentWorkAssigmentService.editConcurrentWorkAssi(this.saveConcurrent).subscribe(() => {
      this.notiService.updateSuccess();
      this.loadData();
    }, error => {
      this.loadData();
    })
    sender.closeRow(rowIndex);
  }

  public cancelHandler({sender, rowIndex}) {
    this.closeEditor(sender, rowIndex);
  }

  // year
  getYear() {
    this.skip = 0;
    this.loadData();
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadData();
  }

  onChange(row: any) {
    this.mySelection = row;
    this.delAllbtn = this.mySelection.length <= 0;
  }

  loadData() {
    if (this.dataFilter.year.code) {
      this.boolPage = true;
      this.loadingPage.next(true);
      // tslint:disable-next-line:max-line-length
      this.concurrentWorkAssigmentService.getConcurrentPage(this.dataFilter.year.code, this.facultyID, this.employeeID, this.cateCode, this._pageSize, this.skip).pipe(takeUntil(this.ngUnsubscribe)).toPromise().then((datas) => {
        this.loadingPage.next(false);
        this.gridView = ({
          data: datas.items,
          total: datas.totalCount
        })
        this.loadingPage.next(true);
        this.boolPage = false;
      }, error1 => {
        this.boolPage = false;
        this.loadingPage.next(true);
      })
      this.checkYearFlag = this.dataFilter.year.code;
    }
  }

  deleteConcurent() {
    this.boolDelete = true;
    this.okLoadingDelete.next(true);
    this.concurrentWorkAssigmentService.deleteConcurrentWorkAss(this.mySelection).subscribe(() => {
      this.mySelection = [];
      this.notiService.deleteSuccess();
      this.skip = 0;
      this.loadData();
      this.dialog.dismissAll();
      this.boolDelete = false;
      this.okLoadingDelete.next(false);
      this.openDel = false;
    }, error => {
      this.dialog.dismissAll();
      this.boolDelete = false;
      this.okLoadingDelete.next(false);
      this.openDel = false;
    });
  }

  public close(status) {
    this.openDel = false;
  }

  handleFilter(value) {
    this.checkCateName(value);
    this.dataConcurrent = [];
    this.dataConcurrent = this.listConcurentType.filter(item => item.name.toLowerCase().indexOf(value.trim().toLowerCase()) !== -1);
  }

  openDelete(modalDelete: any) {
    this.dialog.open(modalDelete, {windowClass: 'myCustomModalClass', centered: true});
    document.getElementById('deleteConcurent').focus();
  }

  search(value: any) {
    this.cateCode = value.cateCode;
    this.facultyID = value.idFaculty;
    this.employeeID = value.employeeID;
    this.skip = 0;
    this.loadData();
  }

  checkCateName(value) {
    let index = -1;
    if(value){
      index   = this.dataConcurrent.findIndex(item => item.name.trim() === value.trim());
    }
    if (index > -1) {
      this.boolSave = false;
    } else {
      this.boolSave = true;
    }
  }
  checkBur(){

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
  check(){
    this.boolSave = false;
  }
}

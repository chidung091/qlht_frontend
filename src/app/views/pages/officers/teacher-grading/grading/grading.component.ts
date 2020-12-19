import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Department} from '../../../../../core/service/model/department.model';
import {
  EvaluationHionHistory,
  TeacherGradingFindModel, TeacherGradingModel
} from '../../../../../core/service/model/teacher-grading';
import {BehaviorSubject, Observable} from 'rxjs';
import {GridComponent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {Select, Store} from '@ngxs/store';
import {TeacherGradingService} from '../../../../../core/service/service-model/teacher-grading.service';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {DepartmentState} from '../../../../../core/service/states/department.state';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {select} from '@ngrx/store';
import {
  EvaluationCriteriaModel
} from '../../../../../core/evaluation-criteria/_models/evaluation-criteria.model';
import {Store as StoreRx} from '@ngrx/store';
import {AppState} from '../../../../../core/reducers';
import {
  getCateEvaluation
} from '../../../../../core/evaluation-criteria/_selectors/evaluation-criteria.selector';
import {AllEvaluationCriteriaByCode} from '../../../../../core/evaluation-criteria/_actions/evaluation-criteria.action';
import {takeUntil} from 'rxjs/operators';
import {SmasContextService} from '../../../../../core/_base/layout';
import {SmasConText} from '../../../../../core/_base/layout/models/smas-context.model';
import {NgUnsubscribe} from '../../../../shared/directives';
import {locale} from "../../../../../core/_config/i18n/vi";
import {Policies} from "../../../../../core/_constants";

@Component({
  selector: 'kt-grading',
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.scss']
})
export class GradingComponent extends NgUnsubscribe implements OnInit {
  VI_LANG = locale.data;
  TeacherGradingCreate: string = Policies.EMPLOYEEMANAGEMENT_TEACHERGRADING_CREATE;
  TeacherGradingEdit: string = Policies.EMPLOYEEMANAGEMENT_TEACHERGRADING_EDIT;
  TeacherGradingDelete: string = Policies.EMPLOYEEMANAGEMENT_TEACHERGRADING_DELETE;
  isCollapsed = true;
  public form: FormGroup;

  public _pageSize = 5;
  public skip = 0;
  public pageSizes: Array<number> = [10, 20];
  public buttonCount = 5;
  public mySelection: string[] = [];
  public idSchoolFaculty = '';
  boolSave = false;
  list: string[][] = [];
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public boolLoading = false;
  public teacherGradingFindIF: TeacherGradingFindModel = new TeacherGradingFindModel();
  public gridView: GridDataResult = new class implements GridDataResult {
    data: any[];
    total: number;
  };
  public openImport = false;
  boolEdit = false;
  dataFilter: SmasConText;
  date = new Date();
  listTeacherGradingId: string[] = [];
  boolOK = false;
  listColumns: EvaluationCriteriaModel[];
  formData: FormGroup;
  teacherGrading: any;

  // du lieu tim kiem
  public faculityId = null;
  public employeeName = null;

  // dữ liệu của lưu và xóa
  public listIndexCheck: number[] = [];
  public listIndexUnCheck: number[] = [];
  public listDataEdit: TeacherGradingModel[] = [];

  // du lieu hien thi
  public listGrading: TeacherGradingModel[] = [];
  public listgradingHistory: TeacherGradingModel[] = [];
  public defau = 'Lựa chọn';
  private editedRowIndex: number;

  @Input() component: string;
  @Output() submitSearch = new EventEmitter();
  public loadingDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  boolLoadingEdit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private store: Store, private teacherGradingService: TeacherGradingService,
              private notiService: NotiService,
              private storeRx: StoreRx<AppState>,
              private smasContextService: SmasContextService,
              private dialog: NgbModal
  ) {
    super();
    this.selectState();
    this.loadSate();
    this.smasContextService.onConfigUpdated$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.dataFilter = smasContextService.getSmasConText();
      if (this.dataFilter.year.code) {
        if (this.listColumns) {
          this.getYear();
        }
      }
    });
  }

  @Select(DepartmentState.depar) schoolFaculty$: Observable<Department[]>

  evaluations$: Observable<EvaluationCriteriaModel[]>

  ngOnInit(): void {
    this.evaluations$ = this.storeRx.pipe(select(getCateEvaluation, 'EMPLOYEEE_VALUATION'));
    this.dataFilter = this.smasContextService.getSmasConText();
    if (this.dataFilter.year.code) {
      this.loadData();
    }
  }

  selectState() {
    this.evaluations$ = this.storeRx.pipe(select(getCateEvaluation, 'EMPLOYEEE_VALUATION'));
  }

  loadSate() {
    this.evaluations$.subscribe(data => {
      if (!data) {
        this.storeRx.dispatch(new AllEvaluationCriteriaByCode({code: 'EMPLOYEEE_VALUATION'}));
      } else {
        this.listColumns = data;
        this.listColumns.forEach(item => {
          this.list.push(item.value.split(','));
        })
        this.loadData();
      }
    })
  }

  // year
  getYear() {
    this.skip = 0;
    this.loadData();
    this.checkYear();
  }

  checkYear() {
    if ((this.dataFilter.year.code) &&
      (parseInt(this.dataFilter.year.code.trim().substring(0, 4), 10) !== this.date.getFullYear())) {
      this.boolEdit = true;
    } else {
      this.boolEdit = false;
    }
  }

  public close(status: string) {
    this.openImport = false;
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadData();
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadData();
  }

  deleteTeacherGrading() {
    this.loadingDelete.next(true);
    this.listTeacherGradingId = this.listTeacherGradingId.filter(item => item !== '00000000-0000-0000-0000-000000000000');
    if (this.listTeacherGradingId.length > 0) {
      this.teacherGradingService.deletelistTeacherGrading(this.listTeacherGradingId).subscribe(() => {
        this.loadingDelete.next(false);
        this.notiService.deleteSuccess();
        this.dialog.dismissAll();
        this.loadData();
      }, error1 => {
        this.loadingDelete.next(false);
        this.dialog.dismissAll();
      })
    } else {
      this.loadingDelete.next(false);
      this.dialog.dismissAll();
    }
    this.resetList();
  }

  checkOruncheck(value) {
    if (value.deselectedRows.length !== 0) {
      this.listIndexUnCheck = [];
      value.deselectedRows.forEach(data => {
        this.listIndexUnCheck.push(data.index);
      });
      this.setValueUnCheck();
    }
    if (value.selectedRows.length !== 0) {
      this.listIndexCheck = [];
      value.selectedRows.forEach(data => {
        this.listIndexCheck.push(data.index);
      });
      this.setValueCheck();
    }
  }

  setValueCheck() {
    this.listIndexCheck.forEach(index => {
      const data = this.gridView.data[index - this.skip];
      this.listTeacherGradingId.push(data.id);
      data.schoolYearId = this.dataFilter.year.id;
      data.schoolYearCode = this.dataFilter.year.code;
      this.listDataEdit.push(data);
    });
  }

  setValueUnCheck() {
    this.listIndexUnCheck.forEach(index => {
      this.listDataEdit = this.listDataEdit.filter(item => item.employeeCode !== this.gridView.data[index - this.skip].employeeCode);
      this.listTeacherGradingId = this.listTeacherGradingId.filter(item => item !== this.gridView.data[index - this.skip].id);
    });
  }

  search(value) {
    this.faculityId = value.idSchoolFaculty;
    this.employeeName = value.nameTeacher;
    this.loadData();
    // this.getYear();
  }

  openModalDelete(mymodal) {
    this.loadingDelete.next(false);
    this.dialog.open(mymodal, {windowClass: 'myCustomModalClass', centered: true});
    document.getElementById('focusDelete').focus();
  }

  createFormFind() {
    this.teacherGradingFindIF.facultyId = this.faculityId;
    this.teacherGradingFindIF.fullName = this.employeeName;
    this.teacherGradingFindIF.evaluationGroupCode = 'EMPLOYEEE_VALUATION';
    if (this.dataFilter) {
      this.teacherGradingFindIF.schoolYearID = this.dataFilter.year.id;
      this.teacherGradingFindIF.schoolYearCode = this.dataFilter.year.code;
    }
    this.teacherGradingFindIF.skipCount = this.skip;
    this.teacherGradingFindIF.maxResultCount = this._pageSize;
  }

  okSave(data) {
    this.boolLoadingEdit.next(true);
    this.boolOK = true;
    this.teacherGradingService.editTeacherGradping(data).subscribe(() => {
      this.boolLoadingEdit.next(false);
      this.boolOK = false;
      this.notiService.updateSuccess();
      this.loadData();
    }, error1 => {
      this.boolLoadingEdit.next(false);
      this.mySelection = [];
      this.listTeacherGradingId = [];
      this.listDataEdit = [];
    })
    this.resetList();
  }

  resetList() {
    this.mySelection = [];
    this.listTeacherGradingId = [];
    this.listDataEdit = [];
  }

  loadData() {
    if (this.dataFilter) {
      if (this.dataFilter.year.code && this.listColumns) {
        this.createFormFind();
        this.boolLoading = true;
        this.isLoading$.next(true);
        this.teacherGradingService.mergeMapConcat(this.teacherGradingFindIF).subscribe(data => {
          this.listGrading = [];
          data.employee.forEach(item => {
            let teacherGrading = new TeacherGradingModel();
            teacherGrading.id = '';
            teacherGrading.employeeId = item.id;
            teacherGrading.employeeCode = item.code;
            teacherGrading.employeeName = item.fullName;
            teacherGrading.schoolYearId = this.dataFilter.year.id;
            teacherGrading.schoolYearCode = this.dataFilter.year.code;
            teacherGrading.employeeEvaluationHistory = [];
            this.listGrading.push(teacherGrading);
          });
          this.listGrading.forEach(itemG => {
            if (itemG) {
              itemG.employeeEvaluationHistory = [];
              this.listColumns.forEach(itemC => {
                let evaluationHistory = new EvaluationHionHistory();
                evaluationHistory.criteriaCode = itemC.name;
                evaluationHistory.criteriaValue = 'Lựa chọn';
                itemG.employeeEvaluationHistory.push(evaluationHistory);
              })
            }
          })
          data.evalua.subscribe(dataE => {
            if (dataE) {
              this.listgradingHistory = dataE;
              this.listGrading.forEach(itemG => {
                const index = this.listgradingHistory.findIndex(itemH => itemH.employeeId === itemG.employeeId);
                if (index !== -1) {
                  itemG.id = this.listgradingHistory[index].id;
                  itemG.employeeEvaluationHistory.forEach(itemGD => {
                    const location = this.listgradingHistory[index].employeeEvaluationHistory.findIndex(itemEH => itemEH.criteriaCode === itemGD.criteriaCode);
                    if (location !== -1) {
                      itemGD.criteriaValue = this.listgradingHistory[index].employeeEvaluationHistory[location].criteriaValue;
                    }
                  });
                }
                this.isLoading$.next(true);
                this.boolLoading = false;
              })
            }
          })
          this.isLoading$.next(true);
          this.gridView = {
            total: data.total,
            data: this.listGrading
          }
          this.isLoading$.next(true);
          this.boolLoading = false;
        }, error => {
          this.isLoading$.next(true);
          this.boolLoading = false;
        });
      }
    }
  }

  public editHandler({sender, rowIndex, dataItem}) {
    this.boolSave = true;
    this.closeEditor(sender);
    this.formData = new FormGroup({
      evaluation: new FormControl('')
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
    // this.boolPage = true;
    const index = rowIndex % this._pageSize;
    this.teacherGrading = formGroup.value;
    const data = this.gridView.data[index];
    this.okSave(data);
    sender.closeRow(rowIndex);
  }

  public cancelHandler({sender, rowIndex}) {
    this.closeEditor(sender, rowIndex);
  }

  check() {
    this.boolSave = false;
  }

  public exportToExcel(grid: GridComponent) {
    grid.saveAsExcel();
  }

}

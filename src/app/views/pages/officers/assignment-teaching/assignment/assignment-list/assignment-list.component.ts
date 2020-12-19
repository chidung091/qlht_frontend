import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {locale} from '../../../../../../core/_config/i18n/vi';
import {AssignmentActionComponent} from '../assignment-action/assignment-action.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImportFileExcelComponent} from '../../../employee-profile/profile/import-file-excel/import-file-excel.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {AssignmentTeachingService} from '../../../../../../core/employee/assignment-teaching/assignment-teaching.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {CommonStore} from '../../../../../../core/common';
import {AppState} from '../../../../../../core/reducers';
import {DropDownListComponent} from '@progress/kendo-angular-dropdowns';
import {EmployeeService} from '../../../../../../core/service/service-model/employee.service';
import {EmployeeProfileModel} from '../../../../../../core/service/model/Employee-profile';
import {NotiService} from '../../../../../../core/service/service-model/notification.service';
import {AssignmentTeachingModel} from '../../../../../../core/employee/assignment-teaching/assignment-teaching.module';
import {SmasContextService} from '../../../../../../core/_base/layout';
import {SmasConText} from '../../../../../../core/_base/layout/models/smas-context.model';

@Component({
  selector: 'kt-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent extends CommonStore implements OnInit {

  dataItem: any;
  loadingKendoGrid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pageSizes: Array<number> = [5, 10, 20];
  _pageSize = 5;
  skip = 0;
  gridView: GridDataResult;
  mySelection: string[] = [];
  editedRowIndex: number;
  public loadingSubmitDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  disableButtonDelete = true;

  formDataEdit: FormGroup;

  defaultSchoolFaculty: {id: string, facultyName: string} = {id: null, facultyName: 'Lựa chọn'};
  defaultTeacher: {id: string, fullName: string} = {id: null, fullName: 'Lựa chọn'};

  // Auto Complete Teacher
  disableDropdownTeacher = true;
  loadingDropdownTeacher = false;
  @ViewChild('teacher') resetTeacher: DropDownListComponent;
  listEmployee: EmployeeProfileModel[];

  // Nhận dữ liệu tìm kiếm từ component assignment component
  @Input() dataSearchAssignment: any;

  // Nhận dữ liệu chọn học kỳ
  @Input() semesterActive: string;

  VI_LANG = locale.data;
  @ViewChild('deleteDialog') deleteDialog;

  // Tạo biến truyền vào api Phân trang
  dataSearchSemester: string;
  dataSearchClass: string;
  dataSearchSchoolFaculty: string;
  dataSearchTeacher: string;
  dataSearchActive: string;

  constructor(
    private modalService: NgbModal,
    private assignmentService: AssignmentTeachingService,
    private store$: Store<AppState>,
    private employeeService: EmployeeService,
    private notificationService: NotiService,
    private smasContextService: SmasContextService
  ) {
    super(store$);
  }

  ngOnInit(): void {
    this.loadDataToGrid();
  }

  // Load data to Grid
  loadDataToGrid() {
    if (this.dataSearchAssignment) {
      this.dataSearchSemester = this.semesterActive;
      this.dataSearchClass = this.dataSearchAssignment.dataSearchClass ;
      this.dataSearchSchoolFaculty = this.dataSearchAssignment.dataSearchSchoolFaculty ;
      this.dataSearchTeacher = this.dataSearchAssignment.dataSearchTeacher ;
      this.dataSearchActive = this.dataSearchAssignment.dataSearchActive ;
    } else {
      this.dataSearchSemester = this.semesterActive;
      this.dataSearchClass = null;
      this.dataSearchSchoolFaculty = null;
      this.dataSearchTeacher = null;
      this.dataSearchActive = null;
    }
    this.loadingKendoGrid.next(true);
    this.assignmentService.getAllAssignmentTeacher(this.dataSearchSemester, this.dataSearchClass, this.dataSearchSchoolFaculty,
      this.dataSearchTeacher, this.dataSearchActive, this.skip, this._pageSize).subscribe(data => {
      if (data) {
        this.gridView = ({
          data: data.items,
          total: data.totalCount
        });
      }
      this.loadingKendoGrid.next(false);
    }, error => {
      this.loadingKendoGrid.next(true);
    });
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadDataToGrid();
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadDataToGrid();
  }

  onChange(row: any): void{
    this.mySelection = row;
    if (this.mySelection.length > 0) {
      this.disableButtonDelete = false;
    } else {
      this.disableButtonDelete = true;
    }
  }

  // Bắt giá trị thay đổi Tổ bộ môn để check Giáo viên
  changeValueSchoolFaculty() {
    this.disableDropdownTeacher = true;
    this.resetTeacher.reset();
    this.formDataEdit.value.employeeId = null;
    if (this.formDataEdit.value.facultyId) {
      this.disableDropdownTeacher = false;
      this.loadingDropdownTeacher = true;
      this.employeeService.getEmployeeByFacultyId(this.formDataEdit.value.facultyId).subscribe(data => {
        if (data){
          this.listEmployee = data;
        }
        this.loadingDropdownTeacher = false;
      }, error => {
        this.loadingDropdownTeacher = false;
      });
    } else {
      this.disableDropdownTeacher = true;
      this.resetTeacher.reset();
      this.formDataEdit.value.teacher = null;
    }
  }

  openModalDelete(dataItem: any) {
    this.modalService.open(this.deleteDialog, {
      size: 'small',
      centered: true
    });
    document.getElementById('deleteElement').focus();
  }

  closeModalDelete() {
    this.modalService.dismissAll();
  }

  submitDelete() {
    this.loadingSubmitDelete.next(true);
    if (this.mySelection.length > 1) {
      this.assignmentService.deleteMultiAssignmentTeaching(this.mySelection).subscribe(() => {
        this.loadingSubmitDelete.next(false);
        this.skip = 0;
        this.loadDataToGrid();
        this.modalService.dismissAll();
        this.disableButtonDelete = true;
        this.mySelection = [];
        this.notificationService.deleteSuccess();
      }, error => {
        this.loadingSubmitDelete.next(false);
        this.disableButtonDelete = true;
        this.mySelection = [];
      });
    } else {
      this.assignmentService.deleteAssignmentTeaching(this.mySelection[0]).subscribe(() => {
        this.loadingSubmitDelete.next(false);
        this.skip = 0;
        this.loadDataToGrid();
        this.modalService.dismissAll();
        this.disableButtonDelete = true;
        this.mySelection = [];
        this.notificationService.deleteSuccess();
      }, error => {
        this.loadingSubmitDelete.next(false);
        this.disableButtonDelete = true;
        this.mySelection = [];
      })
    }
  }

  // Mở modal import file excel
  openImportFileExcel() {
    const dialog = this.modalService.open(ImportFileExcelComponent, {
      size: 'lg',
      centered: true
    });
    dialog.componentInstance.title = 'Import File Excel';
    dialog.result
      .then(() => {
        this.loadDataToGrid();
      })
      .catch((error) => error);
  }

  // Mở modal add
  openModalAdd() {
    const dialogRef = this.modalService.open(AssignmentActionComponent, {
      size: 'xl',
      centered: true,
    });
    dialogRef.componentInstance.title = 'Thêm mới phân công giảng dạy';
    dialogRef.result
      .then(() => {
        this.loadDataToGrid();
      })
      .catch((error) => error);
  }

  // Mở sửa trong grid
  editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);
    this.formDataEdit = new FormGroup({
      employeeId: new FormControl(dataItem.employeeId, Validators.required),
      employeeName: new FormControl(dataItem.employeeName),
      classId: new FormControl(dataItem.classId),
      className: new FormControl(dataItem.className),
      semester: new FormControl(dataItem.semester),
      academicYearId: new FormControl(dataItem.academicYearId),
      classSubjectId: new FormControl(dataItem.classSubjectId),
      classSubjectName: new FormControl(dataItem.classSubjectName),
      facultyId: new FormControl(dataItem.facultyId, Validators.required),
      facultyName: new FormControl(dataItem.facultyName),
      concurrentHourNumber: new FormControl(dataItem.concurrentHourNumber),
      assignedHourNumber: new FormControl(dataItem.assignedHourNumber),
      isActive: new FormControl(dataItem.isActive),
    });
    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formDataEdit);
  }

  // Cancel Sửa
  cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  // Lưu data sửa
  saveHandler({ sender, rowIndex, dataItem }) {
    this.loadingKendoGrid.next(true);

    let facultyAfterSelect;
    let teacherAfterSelect;

    this.schoolFaculty$.subscribe(data => {
      facultyAfterSelect =  data.find(item => item.id === this.formDataEdit.value.facultyId)
    })

    teacherAfterSelect =  this.listEmployee.find(item => item.id === this.formDataEdit.value.employeeId)

    this.formDataEdit.value.facultyId = facultyAfterSelect.id;
    this.formDataEdit.value.facultyName = facultyAfterSelect.facultyName;
    this.formDataEdit.value.employeeId = teacherAfterSelect.id;
    this.formDataEdit.value.employeeName = teacherAfterSelect.fullName;

    this.smasContextService.yearUpdate$.subscribe(data => {
        if(data) {
            this.formDataEdit.value.academicYearId = data.id
        }
      
    })

    const assignment: AssignmentTeachingModel = this.formDataEdit.value;

    this.assignmentService.editAssignmentTeaching(dataItem.id, assignment).subscribe(data => {
      this.notificationService.updateSuccess();
      this.loadDataToGrid();
      sender.closeRow(rowIndex);
    }, () => this.loadingKendoGrid.next(false));
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formDataEdit = undefined;
  }
}

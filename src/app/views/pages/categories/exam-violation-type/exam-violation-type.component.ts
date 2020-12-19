import {Component, HostListener, OnInit} from '@angular/core';
import {GridDataResult, PageChangeEvent, SelectableSettings} from '@progress/kendo-angular-grid';
import {ErrorExamModel} from './model/error-exam.model';
import {ExamViolationTypeService} from '../../../../core/service/service-model/exam-violation-type.service';
import {NotiService} from '../../../../core/service/service-model/notification.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {ExamViolationTypeModel} from '../../../../core/service/model/exam-violation-type.model';
import {Policies} from '../../../../core/_constants/policy.constants';
import {FormControl} from '@angular/forms';
import {locale} from '../../../../core/_config/i18n/vi';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'kt-exam-violation-type',
  templateUrl: './exam-violation-type.component.html',
  styleUrls: ['./exam-violation-type.component.scss']
})
export class ExamViolationTypeComponent implements OnInit {
  VI_LANG = locale.data
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public okLoadingPost: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  listExamViolation: ExamViolationTypeModel[] = [];
  numberPer: any;
  totalCount: number;
  keyWord: '';
  violationExamRegulationUserType = 0;
  skip = 0;
  actionDialog = '';
  data: any;
  rowsSelected: number[];
  public gridView: GridDataResult;
  public mySelection: string[] = [];
  _pageSize = 5;
  pageSizes: Array<number> = [10, 20];
  public selectTableSetting: SelectableSettings = {
    checkboxOnly: true
  }
  public buttonCount = 5;
  checkDeleteAll = true;
  openDelete = false;
  openDeleteList = false;
  dataDelete: ExamViolationTypeModel;
  public boolPage: boolean;
  public boolDeleteOne = false;
  public boolDeleteList = false;
  opendabc = false;

  roleCreate: string = Policies.CATEGORYMANAGEMENT_EXAMVIOLATIONTYPE_CREATE
  roleEdit: string = Policies.CATEGORYMANAGEMENT_EXAMVIOLATIONTYPE_EDIT
  roleDelete: string = Policies.CATEGORYMANAGEMENT_EXAMVIOLATIONTYPE_DELETE
  formDataPost: any;
  formDataPut: any;
  modalOptions: NgbModalOptions;
  closeResult: string;
  formOutput: FormControl;
  textExam = '';
  isDisable = false;
  public okLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private examViolationTypeService: ExamViolationTypeService,
              private notiService: NotiService,
              private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      centered: true,
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  open(content, at) {
    this.setAction(at)
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    document.getElementById('actionCategory').focus();
  }

  okDeleteList(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    document.getElementById('deleteAction').focus();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public closeModal() {
    this.modalService.dismissAll('Cross click');
    this.isDisable = false;
  }

  search(e) {
    this.keyWord = e.errorExam;
    // this.violationExamRegulationUserType = e.personExam;
    this.skip = 0;
    this.loadData();
  }

  setAction(at: string) {
    this.actionDialog = at;
    if (this.actionDialog === 'create') {
      this.textExam = 'Thêm mới lỗi vi phạm quy chế thi'
    } else if (this.actionDialog === 'edit') {
      this.textExam = 'Cập nhật vi phạm quy chế thi';
    }
  }

  deleteAction() {
    this.boolDeleteList = true;
    if (this.mySelection.length > 0) {
      if (this.mySelection.length >= this.listExamViolation.length && this.skip > 0) {
        this.skip = this.skip - this._pageSize;
        if (this.skip < 0) {
          this.skip = 0;
        }
      }
      this.examViolationTypeService.deleteListExam(this.mySelection).subscribe(value => {
        this.notiService.deleteSuccess();
        this.openDeleteList = false;
        this.closeModal()
        this.loadData();
        this.boolDeleteList = false;
      });
      this.mySelection = [];
    }
  }

  public onChange(rows: number[]) {
    this.rowsSelected = rows;
    if (this.rowsSelected.length > 0) {
      this.checkDeleteAll = false;
    } else {
      this.checkDeleteAll = true;
    }
  }

  // editAction(dataItem: any) {
  //   this.data = dataItem;
  //   this.setAction('edit');
  // }
  editAction(content, dataItem: any, at) {
    this.setAction(at)
    this.data = dataItem;
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    document.getElementById('actionCategory').focus();
    // this.setAction('edit');
  }

  loadData() {
    this.boolPage = true;
    this.examViolationTypeService.getPaginationExam(this.keyWord, this._pageSize, this.skip)
      .subscribe(value => {
          this.listExamViolation = value.items,
            this.totalCount = value.totalCount
          this.isLoading.next(false);
          this.gridView = ({
            data: this.listExamViolation,
            total: this.totalCount
          });
          this.isLoading.next(true);
          this.boolPage = false;
        }
      )
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadData();
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadData();
  }

  postData(value) {
    this.formOutput = value
    if (value !== undefined) {
      this.formDataPost = {
        name: this.formOutput.value.name.trim(),
        minusMark: this.formOutput.value.minusMark,
        description: this.formOutput.value.description.trim(),
        violationExamRegulationUserType: this.formOutput.value.violationExamRegulationUserType,
      }
      this.isDisable = true;
    }
  }

  putData(value) {
    this.isDisable = true;
    this.formOutput = value
    this.formDataPut = {
      name: this.formOutput.value.name.trim(),
      minusMark: this.formOutput.value.minusMark,
      description: this.formOutput.value.description.trim(),
      violationExamRegulationUserType: this.formOutput.value.violationExamRegulationUserType,
    }
  }

  deleteActionOne(payload: ExamViolationTypeModel) {
    this.dataDelete = payload;
    this.openDelete = true;
  }

  okDeleteOne() {
    this.boolDeleteOne = true;
    this.examViolationTypeService.deleteExam(this.dataDelete.id).subscribe(() => {
      this.notiService.deleteSuccess()
      this.loadData();
      this.openDelete = false;
      this.boolDeleteOne = false;
    })
    this.checkDeleteAll = true;
  }

  openDeleteAny() {
    if (this.mySelection.length > 0) {
      this.openDeleteList = true;
      this.opendabc = true;
    }
  }

  public closed(status) {
    this.openDelete = false;
    this.openDeleteList = false;
  }

  getNumberPer(e) {
    this.numberPer = e
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    if (ev.key === 'Enter') {
      if (this.opendabc) {
        this.deleteAction();
      }
    }
  }

  actionExam() {
    if(this.formOutput !== undefined){
      if (this.formOutput.invalid) {
        this.notiService.fillFullInfoWarning()
      } else if (this.actionDialog === 'create') {
        this.okLoading.next(true)
        this.examViolationTypeService.postExam(this.formDataPost).subscribe(value1 => {
            this.notiService.createSuccess();
            this.okLoading.next(false)
            this.skip = 0;
            this.violationExamRegulationUserType = this.numberPer;
            this.loadData();
            this.closeModal();
          }, error => {
            this.okLoading.next(false)
          }
        )
      } else if (this.actionDialog === 'edit') {
        this.okLoading.next(true)
        this.examViolationTypeService.putExam(this.data.id, this.formDataPut).subscribe(value1 => {
          this.notiService.updateSuccess();
          this.okLoading.next(false)
          this.loadData();
          this.closeModal()
        }, error => {
          this.okLoading.next(false)
        })
      }
    }
  }
}

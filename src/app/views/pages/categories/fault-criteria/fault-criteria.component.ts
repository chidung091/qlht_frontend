import {Component, HostListener, OnInit} from '@angular/core';
import {GridDataResult, PageChangeEvent, SelectableSettings} from '@progress/kendo-angular-grid';
import {Select, Store} from '@ngxs/store';
import {NotiService} from '../../../../core/service/service-model/notification.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {FaultCriteriaModel} from '../../../../core/service/model/fault-criteria.model';
import {ViolationModel} from '../violation/model/violation.model';
import {FaultCriteriaService} from '../../../../core/service/service-model/fault-criteria.service';
import {Policies} from '../../../../core/_constants/policy.constants';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {locale} from '../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-fault-criteria',
  templateUrl: './fault-criteria.component.html',
  styleUrls: ['./fault-criteria.component.scss']
})
export class FaultCriteriaComponent implements OnInit {
  VI_LANG= locale.data;
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  listFaultCriteria: FaultCriteriaModel[] = [];
  totalCount: number;
  keyWord: '';
  skip = 0;
  public gridView: GridDataResult;
  public selectTableSetting: SelectableSettings = {
    checkboxOnly: true
  }
  public mySelection: string[] = [];
  pageSizes: Array<number> = [10, 20];
  _pageSize = 5;
  actionDialog = '';
  data: FaultCriteriaModel;
  rowsSelected: number[];
  public buttonCount = 5;
  checkDeleteAll = true;
  openDelete = false;
  openDeleteList = false;
  opendabc = false;
  dataDelete: FaultCriteriaModel;
  public boolPage: boolean;
  public boolDeleteOne = false;
  public boolDeleteList = false;
  roleCreate: string = Policies.CATEGORYMANAGEMENT_FAULTCRITERIA_CREATE
  roleEdit: string = Policies.CATEGORYMANAGEMENT_FAULTCRITERIA_EDIT
  roleDelete: string = Policies.CATEGORYMANAGEMENT_FAULTCRITERIA_DELETE
  formDataPost: any;
  formDataPut: any;
  modalOptions: NgbModalOptions;
  closeResult: string;
  formOutput: FormControl;
  textFC = '';
  isDisable = false;
  public okLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private store: Store,
              private faultCriteiaService: FaultCriteriaService,
              private notiService: NotiService,
              private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      centered: true
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
  okDeleteList(content){
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    document.getElementById('deleteCategory').focus();
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

  public onChange(rows: number[]) {
    this.rowsSelected = rows;
    if (this.rowsSelected.length > 0) {
      this.checkDeleteAll = false;
    } else {
      this.checkDeleteAll = true;
    }
  }
  search(value) {
    this.keyWord = value.nameFault;
    this.skip = 0;
    this.loadData();
  }

  setAction(at: string) {
    this.actionDialog = at;
    if (this.actionDialog === 'create') {
      this.textFC = 'Thêm mới lỗi vi phạm';
    } else if (this.actionDialog === 'edit') {
      this.textFC = 'Cập nhật lỗi vi phạm';
    }
  }

  // editAction(dataItem: any) {
  //   this.data = dataItem;
  //   this.setAction('edit');
  //
  // }
  editAction(content, dataItem: any, at) {
    this.setAction(at)
    this.data = dataItem;
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // this.setAction('edit');
    document.getElementById('actionCategory').focus();
  }

  deleteAction() {
    if (this.mySelection.length > 0) {
      if (this.mySelection.length >= this.listFaultCriteria.length && this.skip > 0) {
        this.skip = this.skip - this._pageSize;
        if (this.skip < 0) {
          this.skip = 0;
        }
      }
      this.boolDeleteList = true;
      this.faultCriteiaService.deleteListFault(this.mySelection).subscribe(value => {
        this.notiService.deleteSuccess();
        this.openDeleteList = false;
        this.closeModal()
        this.loadData();
        this.boolDeleteList = false;
      });
      this.mySelection = [];
    }
  }

  loadData() {
    this.boolPage = true;
    this.faultCriteiaService.getPaginationFault(this.keyWord, this._pageSize, this.skip)
      .subscribe(value => {
        this.isLoading.next(false);
        this.listFaultCriteria = value.items,
          this.totalCount = value.totalCount
        if (value) {
          this.gridView = ({
            data: this.listFaultCriteria,
            total: this.totalCount
          })
        }
        this.isLoading.next(true);
        this.boolPage = false;
      })
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
    if(value !== undefined){
      this.formDataPost = {
        name: this.formOutput.value.name.trim(),
        minusMark: +this.formOutput.value.minusMark,
        absenceFault: this.formOutput.value.absenceFault,
        description: this.formOutput.value.description.trim(),
      }
      this.isDisable = true;
    }
    // this.faultCriteiaService.postFault(value).subscribe(value1 => {
    //     this.notiService.showNoti('Thêm mới thành công', 'success');
    //     this.actionDialog = '';
    //     this.loadData();
    //   }, error => {
    //   this.actionDialog = '';
    //   this.loadData();
    //   }
    // )
  }

  putData(value) {
    this.isDisable = true;
    this.formOutput = value
    this.formDataPut = {
      id: this.data.id,
      name: this.formOutput.value.name.trim(),
      minusMark: +this.formOutput.value.minusMark,
      absenceFault: this.formOutput.value.absenceFault,
      description: this.formOutput.value.description.trim(),
    }
  }

  deleteActionOne(payload: FaultCriteriaModel) {
    this.dataDelete = payload;
    this.openDelete = true;
    this.opendabc = true;
  }

  okDeleteOne() {
    this.boolDeleteOne = true;
    this.faultCriteiaService.deleteFault(this.dataDelete.id).subscribe(() => {
      this.notiService.deleteSuccess()
      this.openDelete = false;
      this.loadData();
      this.boolDeleteOne = false;
    })
  }

  public closed(status) {
    this.openDelete = false;
    this.openDeleteList = false;
  }

  openDeleteAny() {
    if (this.mySelection.length > 0) {
      this.openDeleteList = true;
      this.opendabc = true;
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    if (ev.key === 'Enter') {
      if (this.opendabc) {
        this.deleteAction();
      }
    }
  }
  actionRF() {
    if(this.formOutput !== undefined){
      if (this.formOutput.invalid) {
        this.notiService.fillFullInfoWarning();
      } else if (this.actionDialog === 'create') {
        this.okLoading.next(true)
        this.faultCriteiaService.postFault(this.formDataPost).subscribe(value1 => {
            this.notiService.createSuccess();
            this.okLoading.next(false)
            this.skip = 0;
            this.loadData();
            this.closeModal();
          }, error => {
            this.okLoading.next(false)
          }
        )
      } else if (this.actionDialog === 'edit') {
        this.okLoading.next(true)
        this.faultCriteiaService.putFault(this.data.id, this.formDataPut).subscribe(value1 => {
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

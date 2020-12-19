import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {GridDataResult, PageChangeEvent, SelectableSettings} from '@progress/kendo-angular-grid';
import {BehaviorSubject} from 'rxjs';
import {PraiseDisciplineTypeModel} from '../../../../../core/service/model/praise-discipline-type.model';
import {PraiseDisciplineTypeService} from '../../../../../core/service/service-model/praise-discipline-type.service';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {Policies} from '../../../../../core/_constants/policy.constants';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {locale} from '../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-praise',
  templateUrl: './praise.component.html',
  styleUrls: ['./praise.component.scss']
})
export class PraiseComponent implements OnInit {
  VI_LANG= locale.data;
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  listPraise: PraiseDisciplineTypeModel[];
  totalCount: number;
  keyWord: '';
  type = 0;
  skip = 0;
  actionDialog = '';
  data: any; disableTrash = true;
  public gridView: GridDataResult;
  public mySelection: string[] = [];
  _pageSize = 5;
  rowsSelected: number[];
  pageSizes: Array<number> = [10, 20];
  public selectTableSetting: SelectableSettings = {
    checkboxOnly: true
  }
  public buttonCount = 5;
  // checkDeleteAll = true;
  openDelete = false;
  openDeleteList = false;
  dataDelete: PraiseDisciplineTypeModel;
  public boolPage: boolean;
  // public boolDeleteOne = false;
  public boolDeleteList = false;
  opendabc = false;
  offLoading = true;
  roleCreate: string = Policies.CATEGORYMANAGEMENT_PRAISEDISCIPLINE_CREATE
  roleEdit: string = Policies.CATEGORYMANAGEMENT_PRAISEDISCIPLINE_EDIT
  roleDelete: string = Policies.CATEGORYMANAGEMENT_PRAISEDISCIPLINE_DELETE
  formDataPost: any;
  formDataPut: any;
  modalOptions: NgbModalOptions;
  closeResult: string;
  formOutput: FormControl;
  textPr = '';
  public okLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private praiseDisciplineTypeService: PraiseDisciplineTypeService,
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
  }

  search(value) {
    this.keyWord = value.rewardValue;
    this.skip = 0;
    this.loadData();
  }

  setAction(at: string) {
    this.actionDialog = at;
    if (this.actionDialog === 'create') {
      this.textPr = 'Thêm mới khen thưởng';
    } else if (this.actionDialog === 'edit') {
      this.textPr = 'Cập nhật khen thưởng';
    }
  }

  public onChange(rows: number[]) {
    this.rowsSelected = rows;
    if (this.rowsSelected.length > 0) {
      // this.checkDeleteAll = false;
      this.disableTrash = false;
    } else {
      // this.checkDeleteAll = true;
      this.disableTrash = true;
    }
  }

  deleteAction() {
    this.boolDeleteList = true;
    if (this.mySelection.length > 0) {
      if (this.mySelection.length >= this.listPraise.length && this.skip > 0) {
        this.skip = this.skip - this._pageSize;
        if (this.skip < 0) {
          this.skip = 0;
        }
      }
      this.praiseDisciplineTypeService.deleteListPD(this.mySelection).subscribe(value => {
        this.notiService.updateSuccess();
        this.openDeleteList = false;
        this.closeModal()
        this.loadData();
        this.boolDeleteList = false;
      });
      this.mySelection = [];
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
    // this.setAction('edit');
    document.getElementById('actionCategory').focus();
  }

  loadData() {
    this.boolPage = true;
    this.praiseDisciplineTypeService.getPaginationPD(this.keyWord, this.type, this._pageSize, this.skip)
      .subscribe(value => {
          this.listPraise = value.items,
            this.totalCount = value.totalCount
          this.isLoading.next(false);
          this.gridView = ({
            data: this.listPraise,
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
    this.formDataPost = {
      content: this.formOutput.value.content.trim(),
      plusMarkConduct: +this.formOutput.value.plusMarkConduct,
      plusMarkGraduation: +this.formOutput.value.plusMarkGraduation,
      type: this.type
    }
  }

  putData(value) {
    this.formOutput = value
    this.formDataPut = {
      content: this.formOutput.value.content.trim(),
      plusMarkConduct: +this.formOutput.value.plusMarkConduct,
      plusMarkGraduation: +this.formOutput.value.plusMarkGraduation,
      type: this.type
    }
    // this.praiseDisciplineTypeService.putPD(this.data.id, value).subscribe(value1 => {
    //   this.notiService.showNoti('Chỉnh sửa thành công', 'success');
    //   this.actionDialog ='';
    //   this.loadData();
    // }, error => {
    //   this.actionDialog ='';
    //   this.loadData();
    // })
  }

  deleteActionOne(payload: PraiseDisciplineTypeModel) {
    this.dataDelete = payload;
    this.openDelete = true;
  }

  okDeleteOne() {
    // this.boolDeleteOne = true;
    this.praiseDisciplineTypeService.deletePD(this.dataDelete.id).subscribe(() => {
      this.notiService.deleteSuccess()
      this.loadData();
      this.openDelete = false;
      // this.boolDeleteOne = false;
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
  actionPr() {
    if (this.formOutput.invalid) {
      this.notiService.fillFullInfoWarning()
      // this.saveF = 'Save Fail'
    } else if (this.actionDialog === 'create') {
      this.okLoading.next(true)
      this.praiseDisciplineTypeService.postPD(this.formDataPost).subscribe(value1 => {
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
      this.praiseDisciplineTypeService.putPD(this.data.id, this.formDataPut).subscribe(value1 => {
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

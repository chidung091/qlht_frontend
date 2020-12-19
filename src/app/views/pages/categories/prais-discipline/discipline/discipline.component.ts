import {Component, HostListener, OnInit} from '@angular/core';
import {GridDataResult, PageChangeEvent, SelectableSettings} from '@progress/kendo-angular-grid';
import {DisciplineModel} from './model/discipline.model';
import {PraiseDisciplineTypeService} from '../../../../../core/service/service-model/praise-discipline-type.service';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {BehaviorSubject} from 'rxjs';
import {PraiseDisciplineTypeModel} from '../../../../../core/service/model/praise-discipline-type.model';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {locale} from '../../../../../core/_config/i18n/vi';
import {Policies} from '../../../../../core/_constants/policy.constants';


@Component({
  selector: 'kt-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {
  VI_LANG= locale.data;
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  listDiscipline: PraiseDisciplineTypeModel[];
  totalCount: number;
  keyWord: '';
  skip = 0;
  type = 1;
  actionDialog = '';
  data: any;
  rowsSelected: number[];
  public gridView: GridDataResult;
  public mySelection: string[] = [];
  pageSizes: Array<number> = [10, 20];
  _pageSize = 5;
  public selectTableSetting: SelectableSettings = {
    checkboxOnly: true
  }
  public buttonCount = 5;
  checkDeleteAll = true;
  disableTrash = true;
  openDelete = false;
  openDeleteList = false;
  dataDelete: PraiseDisciplineTypeModel;
  public boolPage: boolean;
  public boolDeleteOne = false;
  public boolDeleteList = false;
  opendabc = false;
  roleCreate: string = Policies.CATEGORYMANAGEMENT_PRAISEDISCIPLINE_CREATE
  roleEdit: string = Policies.CATEGORYMANAGEMENT_PRAISEDISCIPLINE_EDIT
  roleDelete: string = Policies.CATEGORYMANAGEMENT_PRAISEDISCIPLINE_DELETE
  formDataPost: any;
  formDataPut: any;
  modalOptions: NgbModalOptions;
  closeResult: string;
  formOutput: FormControl;
  textDis = '';

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
  }

  search(value) {
    this.keyWord = value.discipline;
    this.skip = 0;
    this.loadData();
  }

  setAction(at: string) {
    this.actionDialog = at;
    if (this.actionDialog === 'create') {
      this.textDis = 'Thêm mới kỷ luật';
    } else if (this.actionDialog === 'edit') {
      this.textDis = 'Cập nhật kỷ luật';
    }
  }

  deleteAction() {
    this.boolDeleteList = true;
    if (this.mySelection.length > 0) {
      if (this.mySelection.length >= this.listDiscipline.length && this.skip > 0) {
        this.skip = this.skip - this._pageSize;
        if (this.skip < 0) {
          this.skip = 0;
        }
      }
      this.praiseDisciplineTypeService.deleteListPD(this.mySelection).subscribe(value => {
        this.notiService.deleteSuccess()
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
      this.disableTrash = false;
    } else {
      this.checkDeleteAll = true;
      this.disableTrash = true;
    }
  }
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
    this.praiseDisciplineTypeService.getPaginationPD(this.keyWord, this.type, this._pageSize, this.skip)
      .subscribe(value => {
          this.listDiscipline = value.items,
            this.totalCount = value.totalCount
          this.isLoading.next(false);
          this.gridView = ({
            data: this.listDiscipline,
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
      minusMarkConduct: +this.formOutput.value.minusMarkConduct,
      type: this.type
    }
  }

  putData(value) {
    this.formOutput = value
    this.formDataPut = {
      content: this.formOutput.value.content.trim(),
      minusMarkConduct: +this.formOutput.value.minusMarkConduct,
      type: this.type
    }
  }

  deleteActionOne(payload: PraiseDisciplineTypeModel) {
    this.dataDelete = payload;
    this.openDelete = true;
  }

  okDeleteOne() {
    this.boolDeleteOne = true;
    this.praiseDisciplineTypeService.deletePD(this.dataDelete.id).subscribe(() => {
      this.notiService.deleteSuccess();
      this.loadData();
      this.openDelete = false;
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
  actionDis() {
    if (this.formOutput.invalid) {
      this.notiService.fillFullInfoWarning();
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

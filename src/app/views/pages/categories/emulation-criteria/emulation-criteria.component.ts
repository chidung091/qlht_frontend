import {Component, HostListener, OnInit} from '@angular/core';
import {GridDataResult, PageChangeEvent, SelectableSettings} from '@progress/kendo-angular-grid';
import {BehaviorSubject, Observable} from 'rxjs';
import {EmulationCriteriaModel} from '../../../../core/service/model/emulation-criteria.model';
import {NotiService} from '../../../../core/service/service-model/notification.service';
import {EmulationCriteriaService} from '../../../../core/service/service-model/emulation-criteria.service';
import {ExperienceTypeModel} from '../../../../core/service/model/experience-type.model';
import {Policies} from '../../../../core/_constants/policy.constants';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {locale} from '../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-emulation-criteria',
  templateUrl: './emulation-criteria.component.html',
  styleUrls: ['./emulation-criteria.component.scss']
})
export class EmulationCriteriaComponent implements OnInit {
  VI_LANG = locale.data;
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  listEmulationCriteria: EmulationCriteriaModel[] = [];
  totalCount: number;
  keyWord = '';
  skip = 0;
  actionDialog = '';
  data: any;
  rowsSelected: number[];
  public gridView: GridDataResult;
  public mySelection: string[] = [];
  pageSizes: Array<number> = [10, 20];
  _pageSize = 5;
  public buttonCount = 5;
  public selectTableSetting: SelectableSettings = {
    checkboxOnly: true
  }
  checkDeleteAll = true;
  openDelete = false;
  openDeleteList = false;
  dataDelete: EmulationCriteriaModel;
  public boolPage: boolean;
  public boolDeleteOne = false;
  public boolDeleteList = false;
  opendabc = false;

  roleCreate: string = Policies.CATEGORYMANAGEMENT_EMULATIONCRITERIA_CREATE
  roleEdit: string = Policies.CATEGORYMANAGEMENT_EMULATIONCRITERIA_EDIT
  roleDelete: string = Policies.CATEGORYMANAGEMENT_EMULATIONCRITERIA_DELETE
  formDataPost: any;
  formDataPut: any;
  modalOptions: NgbModalOptions;
  closeResult: string;
  formOutput: FormControl;
  textEC = '';
  public okLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private notiService: NotiService,
    private emulationCriteriaService: EmulationCriteriaService,
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
    this.keyWord = value.scoreType;
    this.skip = 0;
    this.loadData();
  }

  setAction(at: string) {
    this.actionDialog = at;
    if (this.actionDialog === 'create') {
      this.textEC = 'Thêm mới điểm thi đua'
    } else if (this.actionDialog === 'edit') {
      this.textEC = 'Cập nhật loại điểm thi đua';
    }
  }

  deleteAction() {
    if (this.mySelection.length > 0) {
      if (this.mySelection.length >= this.listEmulationCriteria.length && this.skip > 0) {
        this.skip = this.skip - this._pageSize;
        if (this.skip < 0) {
          this.skip = 0;
        }
      }
      this.boolDeleteList = true;
      this.emulationCriteriaService.deleteListEmu(this.mySelection).subscribe(value => {
        this.notiService.deleteSuccess()
        // this.openDeleteList = false;
        this.closed('close')
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

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadData();
  }

  loadData() {
    this.boolPage = true;
    this.emulationCriteriaService.getPaginationEmu(this.keyWord, this._pageSize, this.skip)
      .subscribe(value => {
        this.isLoading.next(false);
        this.listEmulationCriteria = value.items,
          this.totalCount = value.totalCount
        if (value) {
          this.gridView = ({
            data: this.listEmulationCriteria,
            total: this.totalCount
          })
        }
        this.isLoading.next(true);
        this.boolPage = false;
      })
    // console.log(this.listEmulationCriteria);
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadData();
  }

  postData(value) {
    this.formOutput = value
    this.formDataPost = {
      competitionMarkType: this.formOutput.value.competitionMarkType.trim(),
      benchmark: +this.formOutput.value.benchmark
    }
  }

  putData(value) {
    this.formOutput = value
    this.formDataPut = {
      competitionMarkType: this.formOutput.value.competitionMarkType.trim(),
      benchmark: +this.formOutput.value.benchmark
    }
  }

  deleteActionOne(payload: ExperienceTypeModel) {
    this.dataDelete = payload;
    this.openDelete = true;
  }

  public closed(status) {
    this.openDelete = false;
    this.openDeleteList = false;
  }

  okDeleteOne() {
    this.boolDeleteOne = true;
    this.emulationCriteriaService.deleteEmu(this.dataDelete.id).subscribe(() => {
      this.notiService.deleteSuccess()
      this.openDelete = false;
      this.loadData();
      this.boolDeleteOne = false;
    })
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
        this.emulationCriteriaService.postEmu(this.formDataPost).subscribe(value1 => {
            this.notiService.createSuccess()
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
        this.emulationCriteriaService.putEmu(this.data.id, this.formDataPut).subscribe(value1 => {
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

import {Component, HostListener, OnInit} from '@angular/core';
import {GridDataResult, PageChangeEvent, SelectableSettings} from '@progress/kendo-angular-grid';
import {BehaviorSubject, Observable} from 'rxjs';
import {RewardFinalModel} from '../../../../core/service/model/reward-final.model';
import {NotiService} from '../../../../core/service/service-model/notification.service';
import {ExperienceTypeModel} from '../../../../core/service/model/experience-type.model';
import {RewardFinalService} from '../../../../core/service/service-model/reward-final.service';
import {Policies} from '../../../../core/_constants/policy.constants';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {FormControl} from '@angular/forms';
import {locale} from '../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-ending-reward',
  templateUrl: './reward-final.component.html',
  styleUrls: ['./reward-final.component.scss']
})
export class RewardFinalComponent implements OnInit {
  VI_LANG= locale.data;
  listRewardFinal: RewardFinalModel[] = [];
  totalCount: number;
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public gridView: GridDataResult;
  dataDelete: RewardFinalModel;
  keyWord = '';
  skip = 0;
  _pageSize = 5;
  actionDialog = '';
  public buttonCount = 5;
  // data: any;
  data: RewardFinalModel;
  rowsSelected: number[];
  boolPost = false;
  public selectTableSetting: SelectableSettings = {
    checkboxOnly: true
  }
  checkDeleteAll = true;
  public mySelection: string[] = [];
  pageSizes: Array<number> = [10, 20];
  openDelete = false;
  openDeleteList = false;
  public boolPage: boolean;
  public boolDeleteOne = false;
  public boolDeleteList = false;
  public boolSearch = false;
  opendabc = false;
  turnLoading = 'open'

  roleCreate: string = Policies.CATEGORYMANAGEMENT_REWARDFINAL_CREATE
  roleEdit: string = Policies.CATEGORYMANAGEMENT_REWARDFINAL_EDIT;
  roleDelete: string = Policies.CATEGORYMANAGEMENT_REWARDFINAL_DELETE;
  formDataPost: any;
  formDataPut: any;
  modalOptions: NgbModalOptions;
  closeResult: string;
  formOutput: FormControl;
  textRF = '';
  public okLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private notiService: NotiService,
    private rewardFinalService: RewardFinalService,
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
    this.boolSearch = true;
    this.keyWord = value.endingReward;
    this.skip = 0;
    this.loadData();
    this.boolSearch = false;
  }

  setAction(at: string) {
    this.actionDialog = at;
    if (this.actionDialog === 'create') {
      this.textRF = 'Thêm mới khen thưởng cuối kỳ'
    } else if (this.actionDialog === 'edit') {
      this.textRF = ' Cập nhật khen thưởng cuối kỳ';
    }
  }

  deleteAction() {
    this.boolDeleteList = true;
    if (this.mySelection.length > 0) {
      if (this.mySelection.length >= this.listRewardFinal.length && this.skip > 0) {
        this.skip = this.skip - this._pageSize;
        if (this.skip < 0) {
          this.skip = 0;
        }
      }
      this.rewardFinalService.deleteListRF(this.mySelection).subscribe(value => {
        this.notiService.deleteSuccess();
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
    document.getElementById('actionCategory').focus();
    // this.setAction('edit');
  }

  loadData() {
    this.boolPage = true;
    this.rewardFinalService.getPaginationRF(this.keyWord, this._pageSize, this.skip)
      .subscribe(value => {
          this.listRewardFinal = value.items,
            this.totalCount = value.totalCount
          this.isLoading.next(false);
          this.gridView = ({
            data: this.listRewardFinal,
            total: this.totalCount
          });
          this.isLoading.next(true);
          this.boolPage = false;
        }
      )
  }

  public onChange(rows: number[]) {
    this.rowsSelected = rows;
    if (this.rowsSelected.length > 0) {
      this.checkDeleteAll = false;
    } else {
      this.checkDeleteAll = true;
    }
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
      rewardMode: this.formOutput.value.rewardMode.trim(),
      description: this.formOutput.value.description.trim()
    }
  }

  putData(value) {
    this.formOutput = value
    this.formDataPut = {
      rewardMode: this.formOutput.value.rewardMode.trim(),
      description: this.formOutput.value.description.trim()
    }
  }

  deleteActionOne(payload: ExperienceTypeModel) {
    this.dataDelete = payload;
    this.openDelete = true;
  }

  openDeleteOne() {
    this.openDelete = true;
  }

  okDeleteOne() {
    this.boolDeleteOne = true;
    this.rewardFinalService.deleteRF(this.dataDelete.id).subscribe(() => {
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
    this.openDeleteList = true;
    this.opendabc = true;
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
    if (this.formOutput.invalid) {
      this.notiService.fillFullInfoWarning();
    } else if (this.actionDialog === 'create') {
      this.okLoading.next(true)
      this.rewardFinalService.postRF(this.formDataPost).subscribe(value1 => {
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
      this.rewardFinalService.putRF(this.data.id, this.formDataPut).subscribe(value1 => {
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

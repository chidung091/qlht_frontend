import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {GridDataResult, PageChangeEvent, SelectableSettings} from '@progress/kendo-angular-grid';
import {BehaviorSubject, Observable} from 'rxjs';
import {ExperienceTypeModel} from '../../../../core/service/model/experience-type.model';
import {NotiService} from '../../../../core/service/service-model/notification.service';
import {ExperienceTypeService} from '../../../../core/service/service-model/experience-type.service';
import {ExamViolationTypeModel} from '../../../../core/service/model/exam-violation-type.model';
import {Policies} from '../../../../core/_constants/policy.constants';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {FormControl} from '@angular/forms';
import {locale} from '../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-exp-idea',
  templateUrl: './experience-type.component.html',
  styleUrls: ['./experience-type.component.scss']
})
export class ExperienceTypeComponent implements OnInit {
  VI_LANG = locale.data;
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public gridView: GridDataResult;
  listExperienceType: ExperienceTypeModel[] = []
  totalCount: number;
  dataDelete: ExperienceTypeModel;
  actionDialog = '';
  data: ExperienceTypeModel;
  rowsSelected: number[];
  public mySelection: string[] = [];
  _pageSize = 5;
  public pageSizes: Array<number> = [10, 20];
  public buttonCount = 5;
  public selectTableSetting: SelectableSettings = {
    checkboxOnly: true
  }
  public disabled = false;
  public delAllbtn = true;
  public skip = 0;
  public keyWord: '';
  public boolPage: boolean;
  public boolDeleteOne = false;
  public boolDeleteList = false;
  openDeleteList = false;
  openDelete = false;
  opendabc = false;
  offLoading = false;
  roleCreate: string = Policies.CATEGORYMANAGEMENT_EXPERIENCETYPE_CREATE
  roleEdit: string = Policies.CATEGORYMANAGEMENT_EXPERIENCETYPE_EDIT
  roleDelete: string = Policies.CATEGORYMANAGEMENT_EXPERIENCETYPE_DELETE
  formDataPost: any;
  formDataPut: any;
  modalOptions: NgbModalOptions;
  closeResult: string;
  formOutput: FormControl;
  textExp = '';
  public okLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private notiService: NotiService,
    private experienceTypeService: ExperienceTypeService,
    private modalService: NgbModal
  ) {
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
    this.keyWord = value.keyWord;
    this.skip = 0;
    this.loadData();
  }

  postData(value) {
    this.formOutput = value
    this.formDataPost = {
      name: this.formOutput.value.name.trim(),
      description: this.formOutput.value.description.trim()
    }
    // this.experienceTypeService.postExper(value).subscribe(value1 => {
    //   this.notiService.showNoti('Thêm mới thành công', 'success');
    //   this.actionDialog = '';
    //   this.loadData();
    // }, error => {
    //   this.actionDialog = '';
    //   this.loadData();
    // })
  }

  putData(value) {
    this.formOutput = value
    this.formDataPut = {
      name: this.formOutput.value.name.trim(),
      description: this.formOutput.value.description.trim()
    }
  }

  setAction(at: string) {
    this.actionDialog = at;
    if (this.actionDialog === 'create') {
      this.textExp = 'Thêm mới sáng kiến kinh nghiệm';
    } else if (this.actionDialog === 'edit') {
      this.textExp = 'Cập nhật sáng kiến kinh nghiệm'
    }
  }

  deleteAction() {
    this.boolDeleteList = true;
    if (this.mySelection.length > 0) {
      if (this.mySelection.length >= this.listExperienceType.length && this.skip > 0) {
        this.skip = this.skip - this._pageSize;
        if (this.skip < 0) {
          this.skip = 0;
        }
      }
      this.experienceTypeService.deleteListExper(this.mySelection).subscribe(value => {
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
    this.disabled = this.mySelection.length > 0;
    this.delAllbtn = this.mySelection.length <= 0;
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

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadData();
  }

  loadData() {
    this.boolPage = true;
    this.experienceTypeService.getPaginationExper(this.keyWord, this._pageSize, this.skip)
      .subscribe(value => {
          this.listExperienceType = value.items,
            this.totalCount = value.totalCount
          this.isLoading.next(false);
          this.gridView = ({
            data: this.listExperienceType,
            total: this.totalCount
          });
          this.isLoading.next(true);
          this.boolPage = false;
        }
      )
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadData();
  }


  public closed(status) {
    this.openDelete = false;
    this.openDeleteList = false;
  }

  okDeleteOne() {
    this.boolDeleteOne = true;
    this.experienceTypeService.deleteExper(this.dataDelete.id).subscribe(() => {
      this.notiService.deleteSuccess()
      this.loadData();
      this.openDelete = false;
      this.boolDeleteOne = false;
    })
  }

  deleteActionOne(payload: ExamViolationTypeModel) {
    this.dataDelete = payload;
    this.openDelete = true;
  }

  // @HostListener('document:keyup', ['$event'])
  // onKeyUp(ev: KeyboardEvent) {
  //   if (ev.key === 'Enter') {
  //     if (this.opendabc) {
  //       this.deleteAction();
  //     }
  //   }
  // }

  actionExp() {
    if (this.formOutput.invalid) {
      this.notiService.fillFullInfoWarning()
    } else if (this.actionDialog === 'create') {
      this.okLoading.next(true)
      this.experienceTypeService.postExper(this.formDataPost).subscribe(value1 => {
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
      this.experienceTypeService.putExper(this.data.id, this.formDataPut).subscribe(value1 => {
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

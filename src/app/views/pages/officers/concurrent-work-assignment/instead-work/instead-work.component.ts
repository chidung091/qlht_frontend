import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddSubstituteWorkComponent} from './add-substitute-work/add-substitute-work.component';
import {FormGroup} from "@angular/forms";
import {BehaviorSubject, Subject} from "rxjs";
import {GridDataResult, PageChangeEvent} from "@progress/kendo-angular-grid";
import {SmasContextService} from "../../../../../core/_base/layout";
import {WorkReplacementService} from "../../../../../core/service/service-model/work-replacement.service";
import {WorkReplacementModel} from "../../../../../core/service/model/work-replacement.model";
import {Policies} from "../../../../../core/_constants/policy.constants";
import {locale} from "../../../../../core/_config/i18n/vi";
import {SmasConText} from "../../../../../core/_base/layout/models/smas-context.model";
import {NgUnsubscribe} from "../../../../shared/directives";
import {takeUntil} from "rxjs/operators";
import {NotiService} from "../../../../../core/service/service-model/notification.service";

@Component({
  selector: 'kt-instead-work',
  templateUrl: './instead-work.component.html',
  styleUrls: ['./instead-work.component.scss'],
})
export class InsteadWorkComponent extends NgUnsubscribe implements OnInit {
  // rolevar
  VI_LANG = locale.data;
  roleCreate: string = Policies.CATEGORYMANAGEMENT_CONCURRENTWORKTYPE_CREATE;
  roleEdit: string = Policies.CATEGORYMANAGEMENT_CONCURRENTWORKTYPE_EDIT;
  roleDelete: string = Policies.CATEGORYMANAGEMENT_CONCURRENTWORKTYPE_DELETE;

  // var
  public _pageSize = 5;
  public skip = 0;
  public pageSizes: Array<number> = [5, 10, 20];
  public buttonCount = 5;
  public formGroup: FormGroup;
  public loadingPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  public boolPage = true;
  public gridView: GridDataResult;
  public mySelection: string[] = [];
  delAllbtn = false;
  public facultyID: string;
  public employeeID: string;
  public cateCode: string;

  public openDel = false;
  public okLoadingDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public boolDelete = false;

  // year
  date = new Date();
  destroy$ = new Subject<void>();
  dataFilter: SmasConText;

  @ViewChild('deleteOk') deleteOk: ElementRef;

  constructor(public dialog: NgbModal,
              private smasContextService: SmasContextService,
              private notiService: NotiService,
              private workReplacementService: WorkReplacementService) {
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
    this.loadData();
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadData();
  }

  // open dialog
  openDialog() {
    const dialogRef = this.dialog.open(AddSubstituteWorkComponent, {
      size: 'lg',
      centered:true
    });
    dialogRef.componentInstance.title = 'Thêm mới làm thay kiêm nhiệm';
    dialogRef.componentInstance.workReplacement = new WorkReplacementModel();
    dialogRef.componentInstance.schoolYear = this.dataFilter.year.code;
    dialogRef.result.then(() => {
      this.skip = 0;
      this.loadData();
    }).catch(error1 => {
    })
  }

  openEditDialog(value: WorkReplacementModel) {
    const dialogRef = this.dialog.open(AddSubstituteWorkComponent,{
      size: 'lg',
      centered:true
    });
    dialogRef.componentInstance.title = 'Cập nhật làm thay kiêm nhiệm';
    dialogRef.componentInstance.workReplacement = value;
    dialogRef.componentInstance.schoolYear = this.dataFilter.year.code;
    dialogRef.result.then(() => {
      this.loadData();
    }).catch(error1 => {
    })
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadData();
  }

  onChange(row: any) {
    this.mySelection = row;
    this.delAllbtn = this.mySelection.length === 0;
  }

  public close(status) {
    this.openDel = false;
  }

  // year
  getYear() {
    this.skip = 0;
    this.loadData();
  }
  // action call api
  public loadData() {
    if(this.dataFilter.year.code){
    this.boolPage = true;
    this.loadingPage.next(true);
    this.workReplacementService.getWorkRelacementByPage(this.dataFilter.year.code, this.facultyID, this.employeeID, this.cateCode, this._pageSize, this.skip).subscribe(datas => {
      this.gridView = ({
        data: datas.items,
        total: datas.totalCount
      });
      this.boolPage = false;
      this.loadingPage.next(true);
    }, error => {
      this.boolPage = false;
      this.loadingPage.next(true);
    })
    }
  }

  public deleteWorkReplacement() {
    this.boolDelete = true;
    this.okLoadingDelete.next(true);
    this.workReplacementService.deleteWorkReplace(this.mySelection).subscribe(() => {
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

  search(value: any) {
    this.cateCode = value.cateCode;
    this.facultyID = value.idFaculty;
    this.employeeID = value.employeeID;
    this.skip = 0;
    this.loadData();
  }

  openDelete(modalDelete: any) {
    this.dialog.open(modalDelete, {windowClass: 'myCustomModalClass', centered: true});
    document.getElementById('deleteReplace').focus();
  }
}

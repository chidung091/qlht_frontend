import {Component, OnInit} from '@angular/core';
import {GridDataResult} from '@progress/kendo-angular-grid';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalEditRewardStudentsComponent} from './modal-edit-reward-students/modal-edit-reward-students.component';
import {locale} from "../../../../../core/_config/i18n/vi";
import {Observable} from "rxjs";
import {AllCategoriesRequested, Category, getCate} from "../../../../../core/category";
import {select, Store} from "@ngrx/store";
import {CategoryType} from "../../../../../core/_constants";
import {takeUntil} from "rxjs/operators";
import {NgUnsubscribe} from "../../../../shared/directives";

@Component({
  selector: 'kt-reward-students',
  templateUrl: './reward-students.component.html',
  styleUrls: ['./reward-students.component.scss']
})
export class RewardStudentsComponent extends NgUnsubscribe implements OnInit {

  VI_LANG = locale.data;
  textEC: string = '';
  isCollapsed: boolean = true;
  checkDisableYear: boolean = false;
  public loading = true;
  pageSizes: Array<number> = [5, 10, 20];
  private skip = 0;
  private _pageSize = 5;
  private buttonCount = 5;
  checkDeleteAll: boolean = false;
  _listGradeLevel$: Observable<Category[]>;
  _listGender$: Observable<Category[]>;
  _listStatus$: Observable<Category[]>;
  _listEthnic$: Observable<Category[]>;
  _listBonusForm$: Observable<Category[]>;
  _listClassName$:Observable<Category[]>;
  _defaultItem: any = {cateName: 'Lựa chọn', id: null};

  gridView: GridDataResult;
  fake = [
    {
      hoTen: 'Nguyễn Văn A', maHocSinh: '123', ngaySinh: new Date(), gioiTinh: 'Nam', lop: '9A', soLanKhenThuong: 2
    }
  ]

  ngOnInit(): void {
    this.getDataFormStore();
    this.gridView = ({
      data: this.fake,
      total: 10
    });
  }

  constructor(
    public modal: NgbModal,
    private store: Store,
  ) {
    super()
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    // this.loadData()
  }

  openModalEdit(dataItem: any) {
    const modalRef = this.modal.open(ModalEditRewardStudentsComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.title = 'Thêm mới thông tin khen thưởng cán bộ'
    modalRef.result.then(result => {
      if (result === 'create') {
        this.skip = 0;
      }
    })
  }

  openModalAdd(content: any) {

  }

  openModalDeleteList() {
  }

  closeModal() {
    this.modal.dismissAll('Cross click');
  }

  submit() {
  }

  getDataFormStore() {
    //  Data DM_Khoi
    this._listGradeLevel$ = this.store.pipe(select(getCate, CategoryType.DM_KHOI), takeUntil(this.ngUnsubscribe));
    this._listGradeLevel$.subscribe(result => {
      if (!result) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_KHOI}))
      }
    })

    //  Data DM_GioiTinh
    this._listGender$ = this.store.pipe(select(getCate, CategoryType.DM_GIOI_TINH), takeUntil(this.ngUnsubscribe));
    this._listGender$.subscribe(result => {
      if (!result) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_GIOI_TINH}))
      }
    })

    //  Data DM_TrangThai
    this._listStatus$ = this.store.pipe(select(getCate, CategoryType.DM_TRANG_THAI_HOC_SINH), takeUntil(this.ngUnsubscribe));
    this._listGender$.subscribe(result => {
      if (!result) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_TRANG_THAI_HOC_SINH}));
      }
    })

    //  Data DM_DanToc
    this._listEthnic$ = this.store.pipe(select(getCate, CategoryType.DM_DAN_TOC), takeUntil(this.ngUnsubscribe));
    this._listEthnic$.subscribe(result => {
      if (!result) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_DAN_TOC}));
      }
    })

  //  Data DM_KhenThuong
    this._listBonusForm$ = this.store.pipe(select(getCate, CategoryType.DM_KHEN_THUONG_GV),takeUntil(this.ngUnsubscribe));
    this._listBonusForm$.subscribe(result => {
      if (!result) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_KHEN_THUONG_GV}));
      }
    })

  //  Data DM_LopHoc
    this._listClassName$ = this.store.pipe(select(getCate,CategoryType.DM_CAP_HOC),takeUntil(this.ngUnsubscribe));
    this._listClassName$.subscribe(result=>{
      if (!result) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_CAP_HOC}));
      }
    })
  }
}

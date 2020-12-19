import { LockoutEnabledComponent } from './../lockout-enabled/lockout-enabled.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../service-management/user.service';
import { UserItem } from '../../../model/identity';
import { BehaviorSubject } from 'rxjs';
import { cloneDeep } from 'lodash';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { RoleSettingComponent } from '../role-setting/role-setting.component';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Policies } from 'src/app/core/_constants/policy.constants';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPassComponent } from '../reset-pass/reset-pass.component';

@Component({
  selector: 'kt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  formSearch: FormGroup;
  submitted = false;
  pageSizes: Array<number> = [10, 20, 50];
  isCollapsed = true;
  public skip = 0;
  _pageSize = 10;
  isloading: boolean;
  gridView: GridDataResult;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  listIdsDel: string[] = [];

  UserPemiss: string = Policies.ABPIDENTITY_USERS_MANAGEPERMISSIONS;

  constructor(
    private modal: NgbModal,
    private api: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formSearch = this.fb.group({
      user: new FormControl('', [Validators.maxLength(100)]),
    })
    this.listIdsDel = [];
    this.getAll();
  }

  get f() { return this.formSearch.controls }

  getAll() {
    this.isloading = true;
    const filter = this.formSearch.value.user;
    this.api.getUsers(filter, 0, this.skip, this._pageSize).subscribe(data => {
      this.gridView = ({
        data: data.items,
        total: data.totalCount
      });
      this.isloading = false;
      this.isLoading$.next(true);
    }, () => {
      this.isloading = false;
    })
  }

  viewStatus(data) {
    if (data.isActive === true) {
      return 'Hoạt động'
    } else {
      return 'Không hoạt động'
    }
  }

  trimSpace(formName: string) {
    if (formName) {
      this.formSearch.get(formName).setValue(
        this.formSearch.get(formName).value?.trim().replace(/(\s\s+| )/g, ' ')
      )
    }
  }

  search() {
    this.submitted = true;
    if (this.formSearch.invalid) {
      return;
    }
    this.skip = 0;
    this.getAll();
  }

  // reset() {
  //   this.formSearch.value.user = '';
  //   this.getAll();
  // }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.getAll();
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.getAll();
  }

  openModalCreate() {
    const modalRef = this.modal.open(AddEditUserComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.title = 'Thêm mới người dùng';
    modalRef.result.then(r => {
      if (r) {
        this.ngOnInit();
      }
    });
  }

  openModalEdit(dataItem: any) {
    const modalRef = this.modal.open(AddEditUserComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.title = 'Sửa người dùng';
    modalRef.componentInstance.selectedItem = dataItem;
    modalRef.result.then(r => {
      if (r) {
        this.ngOnInit();
      }
    });
  }

  settingRole(item) {
    const modalRef = this.modal.open(RoleSettingComponent, { size: 'md', centered: true });
    modalRef.componentInstance.UserId = item.id;
    modalRef.componentInstance.UserName = item.name;
  }

  getIdDelete(row) {
    if (row.length === 0) {
      return;
    }
    this.listIdsDel.push(row);
  }

  openModalDelete(dataItem) {
    const modalRef = this.modal.open(DeleteUserComponent);
    modalRef.componentInstance.title = 'Bạn có chắc chắn muốn xóa';
    modalRef.componentInstance.listIds = this.listIdsDel;
    modalRef.componentInstance.selectedItem = dataItem;
    modalRef.result.then(data => {
      if (data == "ok") {
        this.ngOnInit();
      }
    });
  }

  settingLockoutUser(event: MouseEvent, dataItem) {
    const modalRef = this.modal.open(LockoutEnabledComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'md',
      centered: true
    });
    modalRef.componentInstance.selectedItem = dataItem;
    modalRef.result.then(data => {
      if (data === 'lock') {
        this.getAll();
      }
    }).catch(error => error);

  }
  resetPassword(event: MouseEvent, dataItem) {
    const modalRef = this.modal.open(ResetPassComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'md',
      centered: true
    });
    modalRef.componentInstance.selectedItem = dataItem;
    modalRef.result.then(data => {
      if (data === 'reset') {
        this.getAll();
      }
    }).catch(error => error);

  }

  ngOnDestroy(): void {

  }
}

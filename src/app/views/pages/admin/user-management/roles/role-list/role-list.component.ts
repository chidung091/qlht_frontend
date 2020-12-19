import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select } from '@ngxs/store';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { BehaviorSubject, Observable } from 'rxjs';
import { Policies } from '../../../../../../core/_constants/policy.constants';
import { RoleService } from '../../../service-management/role.service';
import { AddEditRoleComponent } from '../add-edit-role/add-edit-role.component';
import { DeleteRolesComponent } from '../delete-roles/delete-roles.component';
import { SettingRoleComponent } from '../setting-role/setting-role.component';

@Component({
  selector: 'kt-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  roleCreate: string = Policies.ABPIDENTITY_ROLES_CREATE;
  roleEdit: string = Policies.ABPIDENTITY_ROLES_UPDATE;
  roleDelete: string = Policies.ABPIDENTITY_ROLES_DELETE;
  rolePemiss: string = Policies.ABPIDENTITY_ROLES_MANAGEPERMISSIONS;

  formSearch: FormGroup;
  submitted = false;
  isCollapsed = true;
  public mySelection: string[] = [];
  public skip = 0;
  _pageSize = 10;
  pageSizes: Array<number> = [10, 20, 50, 100];
  disableBtnDele = true;
  levelSchool = [
    'SMAS 4.0'
  ];

  gridView: GridDataResult;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isloading: boolean;

  constructor(
    public modal: NgbModal,
    private api: RoleService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formSearch = this.fb.group({
      tenvaitro: new FormControl('', [Validators.maxLength(100)]),
    })
    this.getAllRole();
  }

  getAllRole() {
    this.disableBtnDele = true;
    this.isloading = true;
    const Filter = this.formSearch.value.tenvaitro;
    this.api.getAllRole(Filter, '', this.skip, this._pageSize).subscribe(data => {
      this.gridView = ({
        data: data.items,
        total: data.totalCount
      });
      this.isloading = false;
      this.isLoading$.next(true);
    }, () => {
      this.isLoading$.next(true);
      this.isloading = false;
    })
  }

  get f() { return this.formSearch.controls }

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
    this.getAllRole();
  }

  // Reset() {
  //   this.tenVaiTro = '';
  //   this.getAllRole();
  // }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.getAllRole();
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.getAllRole();
  }

  openModalCreate() {
    const modalRef = this.modal.open(AddEditRoleComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.title = 'Thêm mới vai trò';
    modalRef.result.then(data => {
      if (data === 'Thành công') {
        this.getAllRole();
      }
    }).catch(error => error);
  }

  openModalEdit(dataItem: any) {
    const modalRef = this.modal.open(AddEditRoleComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.title = 'Cập nhật vai trò';
    modalRef.componentInstance.selectedItem = dataItem;
    modalRef.result.then(data => {
      if (data === 'Thành công') {
        this.getAllRole();
      }
    }).catch(error => error);
  }

  openModalSettings(item: any) {
    const modalRef = this.modal.open(SettingRoleComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.roleId = item.id;
    modalRef.componentInstance.roleName = item.name;
    modalRef.componentInstance.parentRoleID = item.parentRole;
    modalRef.componentInstance.roleRemark = item.remark;
  }

  onChange(row){
    this.mySelection = row;
    if (this.mySelection.length > 0) {
      this.disableBtnDele = false;
    } else {
      this.disableBtnDele = true;
    }
  }

  openModalDeleteList() {
    const modalRef = this.modal.open(DeleteRolesComponent);
    modalRef.componentInstance.listIds = this.mySelection;
    modalRef.result.then(data => {
      if (data === 'ok') {
        this.skip = 0;
        this.getAllRole();
        this.mySelection = [];
        this.disableBtnDele = true;
      }
    }).catch(error => error);
  }

}

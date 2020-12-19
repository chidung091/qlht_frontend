import { ChangeDetectorRef, Component, Input, OnInit, TrackByFunction, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { Group, Permission, PermissionResponse } from '../../../model/permission';
import { cloneDeep } from 'lodash';
import { PermissionService } from '../../../service-management/permission.service';
import { finalize } from 'rxjs/operators';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'kt-setting-role',
  templateUrl: './setting-role.component.html',
  styleUrls: ['./setting-role.component.scss']
})
export class SettingRoleComponent implements OnInit {

  @Input() roleId: string;
  @Input() roleName: string;
  @Input() parentRoleID: string;
  @Input() roleRemark: string = "";
  parentName: string = '';
  roleNameParent: string = 'Admin';
  selectedGroup: Group[];
  permissions: Permission[] = [];
  DsPermissions: Permission[];
  DefautPermissions: Permission[];
  selectAllTab: boolean = false;
  selectThisTab: boolean = false;
  active: number = 0;
  trackByFn: TrackByFunction<Group> = (_, item) => item.name;
  fakeHeThong = { text: 'SMAS 4.0', value: 'SMAS' };
  fakeCapHoc = { text: 'Cấp 1', value: 'SMAS' };
  isloading: boolean = false;

  @ViewChild("hethong") hethong: DropDownListComponent;

  constructor(
    public _NgbActiveModal: NgbActiveModal,
    private api: PermissionService,
    private cdRef: ChangeDetectorRef,
  ) { }

  get activeModal() {
    return this._NgbActiveModal;
  }

  public cancel() {
    this.activeModal.dismiss();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.hethong.focus()
    }, 10)
  }

  ngOnInit(): void {
    if (this.parentRoleID) {
      this.isloading = true;
      this.api.getRoleById(this.parentRoleID)
      .pipe(
        finalize(() => {
          this.isloading = false;
        })
      )
      .subscribe(rol => {
        this.cdRef.markForCheck();
        this.parentName = rol.name;
        this.roleNameParent = rol.remark;
        this.isloading = false;
      }, e => {
        this.isloading = false;
      })
    }

    this.isloading = true;
    this.api.get('R', this.roleName).subscribe(res => {
      this.selectedGroup = res.groups;

      if (this.selectedGroup.length > 0) {
        this.DsPermissions = res.groups[0].permissions;
        this.permissions = this.getPermissions(res.groups);
        this.DefautPermissions = cloneDeep(this.permissions);
        //Check 2 checkbox selectThisTab and selectAllTab
        const selectedPermissions = this.permissions.filter(per => per.isGranted);
        if (selectedPermissions.length === this.permissions.length) {
          this.selectThisTab = true;
          this.selectAllTab = true;
        } else {
          this.selectThisTab = false;
          this.selectAllTab = false;
        }
      }

      this.isloading = false
    }, () => {
      this.isloading = false
    });
  }

  showContentRole(name, index) {
    this.active = index;
    this.selectedGroup.forEach(x => {
      if (name == x.name) {
        this.DsPermissions = x.permissions.map(
          permission =>
            (({
              ...permission,
              isGranted: x.permissions.find(per => per.name === permission.name).isGranted,
            } as any) as Permission),
        );
      }
    })
    this.setTabCheckboxState();
  }



  setTabCheckboxState() {
    const selectedPermissions = this.permissions.filter(per => per.isGranted);
    const element = document.querySelector('#select-all-in-this-tabs') as any;

    if (selectedPermissions.length === this.permissions.length) {
      element.indeterminate = false;
      this.selectThisTab = true;
    } else if (selectedPermissions.length === 0) {
      element.indeterminate = false;
      this.selectThisTab = false;
    } else {
      element.indeterminate = true;
    }
  }

  onClickSelectAll() {
    this.permissions = this.permissions.map(permission => ({
      ...permission,
      isGranted: !this.selectAllTab,
    }));

    this.selectThisTab = !this.selectAllTab;
  }

  onClickSelectThisTab() {
    this.DsPermissions.forEach(permission => {
      const index = this.permissions.findIndex(per => per.name === permission.name);
      this.permissions = [
        ...this.permissions.slice(0, index),
        { ...this.permissions[index], isGranted: !this.selectThisTab },
        ...this.permissions.slice(index + 1),
      ];
    });
    this.setGrantCheckboxState();
  }

  setGrantCheckboxState() {
    const selectedAllPermissions = this.permissions.filter(per => per.isGranted);
    const checkboxElement = document.querySelector('#select-all-in-all-tabs') as any;

    if (selectedAllPermissions.length === this.permissions.length) {
      checkboxElement.indeterminate = false;
      this.selectAllTab = true;
    } else if (selectedAllPermissions.length === 0) {
      checkboxElement.indeterminate = false;
      this.selectAllTab = false;
    } else {
      checkboxElement.indeterminate = true;
    }
  }


  onClickCheckbox(clickedPermission: Permission, value) {
    setTimeout(() => {
      let clicker = this.permissions.find(per => per.name === clickedPermission.name);
      this.permissions = this.permissions.map(per => {
        if (clickedPermission.name === per.name) {
          return { ...per, isGranted: !per.isGranted };
        } else if (clickedPermission.name === per.parentName && clicker.isGranted) {
          return { ...per, isGranted: false };
        } else if (clickedPermission.parentName === per.name && !clicker.isGranted) {
          return { ...per, isGranted: true };
        }
        return per;
      });
      this.setTabCheckboxState();
      this.setGrantCheckboxState();
    }, 0);
  }

  getChecked(name: string) {
    return (this.permissions.find(per => per.name === name) || { isGranted: false }).isGranted;
  }

  save() {
    const changedPermissions = this.permissions
      .filter(per =>
        this.DefautPermissions.find(unchanged => unchanged.name === per.name).isGranted ===
          per.isGranted
          ? false
          : true,
      )
      .map(({ name, isGranted }) => ({ name, isGranted }));

    let changedPermissions1 = {
      permissions: changedPermissions
    }
    this.isloading = true;
    this.api.update('R', this.roleName, changedPermissions1).subscribe(() => {
      //this.toastr.success('Sửa thành công');
      this.activeModal.close();
      this.isloading = false
    }, () => {
      this.isloading = false
    })

  }

  getPermissions(groups: Group[]): Permission[] {
    return groups.reduce((acc, val) => [...acc, ...val.permissions], []);
  }
}

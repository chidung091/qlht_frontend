import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotiService } from 'src/app/core/service/service-model/notification.service';
import { RoleBase } from '../../../model/identity';
import { UserService } from '../../../service-management/user.service';
import {locale} from '../../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-role-setting',
  templateUrl: './role-setting.component.html',
  styleUrls: ['./role-setting.component.scss']
})
export class RoleSettingComponent implements OnInit {
  VI_LANG = locale.data;

  @Input() UserId: string;
  @Input() UserName: string;

  dsAllRoleUser: RoleBase[] = [];
  dsRoleUserById: RoleBase[] = [];
  dsRoleView: RoleBase[] = [];
  isloading: boolean;
  order = 'value';

  constructor(
    public _NgbActiveModal: NgbActiveModal,
    private api: UserService,
    private notiService: NotiService,
  ) { }

  get activeModal() {
    return this._NgbActiveModal;
  }

  ngOnInit(): void {
    this.getAllRole();
  }

  getAllRole() {
    this.isloading = true;
    this.api.getAllRoleUser().subscribe(data => {
      this.isloading = false;
      this.dsAllRoleUser = data.items;
      this.dsAllRoleUser.map(x =>
        x['value'] = false
      )
      this.getRoleUser();
    }, () => {
      this.isloading = false;
    })
  }

  getRoleUser() {
    this.isloading = true;
    this.api.getRoleUser(this.UserId).subscribe(data => {
      this.isloading = false;
      this.dsRoleUserById = data.items;
      if (this.dsRoleUserById.length > 0 && this.dsAllRoleUser.length > 0) {
        this.dsAllRoleUser.forEach(x => {
          if (this.dsRoleUserById.findIndex(p => p.name === x.name) > -1) {
            x.value = true;
          }
        })
        this.dsRoleView = this.dsAllRoleUser
      } else {
        this.dsRoleView = this.dsAllRoleUser
      }
    }, () => {
      this.isloading = false;
    })
  }

  onCheckboxChange(ClickRole) {
    this.dsRoleView = this.dsRoleView.map(role => {
      if (ClickRole.id === role.id) {
        return { ...role, value: !role.value };
      }
      return role
    });
  }


  public cancel() {
    this.activeModal.dismiss();
  }

  save() {
    let roleBases = [];
    let roleID = {};
    this.dsRoleView.forEach(x => {
      if (x.value === true) {
        roleID = x.name
        roleBases.push(roleID)
      }
    })

    let roleBaseObject = {
      roleNames: roleBases
    }

    this.isloading = true;
    this.api.putRoleUser(this.UserId, roleBaseObject).subscribe(() => {
      this.notiService.updateSuccess();
      this.activeModal.close();
      this.isloading = false;
    }, res => {
      this.isloading = false;
    })
  }

}

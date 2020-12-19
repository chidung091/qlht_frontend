import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotiService } from 'src/app/core/service/service-model/notification.service';
import { RoleService } from '../../../service-management/role.service';
import {locale} from '../../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-delete-roles',
  templateUrl: './delete-roles.component.html',
  styleUrls: ['./delete-roles.component.scss']
})
export class DeleteRolesComponent implements OnInit {
  VI_LANG = locale.data;

  @Input() title: any;
  listIds: string[] = [];
  isDisabled: boolean = false;
  loading: boolean = false;

  constructor(
    public _NgbActiveModal: NgbActiveModal,
    private notiService: NotiService,
    private apiRole: RoleService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this._NgbActiveModal.close()
  }

  onSubmit() {
    this.loading = true;
    this.apiRole.DeleteMultiple(this.listIds).subscribe(() => {
      this.notiService.deleteSuccess();
      this._NgbActiveModal.close('ok');
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
}

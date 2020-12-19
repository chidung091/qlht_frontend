import {Injectable} from '@angular/core';
import {locale} from '../../_config/i18n/vi';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotiService {
  constructor(
    private toastr: ToastrService,
  ) {  }

  showNoti(msg: string, type: 'success' | 'warning' | 'error' | 'info') {
    switch (type) {
      case 'error':
        this.toastr.error(msg);
        break;
      case 'info':
        this.toastr.info(msg);
        break;
      case 'success':
        this.toastr.success(msg);
        break;
      case 'warning':
        this.toastr.warning(msg);
        break;
    }
  }

  createSuccess() {
    this.toastr.success(locale.data.NOTIFICATION.CREATE_SUCCESS)
  }

  updateSuccess() {
    this.toastr.success(locale.data.NOTIFICATION.UPDATE_SUCCESS)
  }

  deleteSuccess() {
    this.toastr.success(locale.data.NOTIFICATION.DELETE_SUCCESS)
  }

  fillFullInfoWarning() {
    this.toastr.warning(locale.data.NOTIFICATION.PLEASE_ENTER_FULL_INFO);
  }
}

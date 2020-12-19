import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeePraiseService} from '../../../../../core/service/service-model/employee-praise.service';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {BehaviorSubject} from 'rxjs';
import {locale} from '../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-modal-delete-praise',
  templateUrl: './modal-delete-praise.component.html',
  styleUrls: ['./modal-delete-praise.component.scss']
})
export class ModalDeletePraiseComponent implements OnInit {
  listIds: string[] = [];
  loadingDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  VI_LANG = locale.data;

  constructor(public _NgbActiveModal: NgbActiveModal,
              private employeePraiseService: EmployeePraiseService,
              private notiService: NotiService) {
  }

  ngOnInit(): void {
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  public cancel() {
    this.activeModal.close('thanh cong');
  }

  onSubmit() {
    this.loadingDelete.next(true);
    this.employeePraiseService.deleteEmployeePraise(this.listIds).subscribe(() => {
      this.notiService.deleteSuccess();
      this._NgbActiveModal.close('ok');
      this.loadingDelete.next(false);
    }, error => this.loadingDelete.next(false))
    this.loadingDelete.next(true);
  }

}

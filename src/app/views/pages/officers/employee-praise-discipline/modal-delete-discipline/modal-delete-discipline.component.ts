import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {EmployeeDisciplineService} from '../../../../../core/service/service-model/employee-discipline.service';
import {locale} from '../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-modal-delete-discipline',
  templateUrl: './modal-delete-discipline.component.html',
  styleUrls: ['./modal-delete-discipline.component.scss']
})
export class ModalDeleteDisciplineComponent implements OnInit {
  listIds: string[] = [];
  loadingDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  VI_LANG = locale.data;

  constructor(public _NgbActiveModal: NgbActiveModal,
              private employeeDisciplineService: EmployeeDisciplineService,
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
    this.employeeDisciplineService.deleteEmployeeDiscipline(this.listIds).subscribe(() => {
      this.notiService.deleteSuccess();
      this._NgbActiveModal.close('ok');
      this.loadingDelete.next(false);
    }, error => this.loadingDelete.next(false))
    this.loadingDelete.next(true);
  }
}

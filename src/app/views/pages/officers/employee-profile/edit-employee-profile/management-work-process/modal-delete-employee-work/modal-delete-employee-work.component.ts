import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { EmployeeWorkHistoryService } from 'src/app/core/service/service-model/employee-working-history-service';
import { NotiService } from 'src/app/core/service/service-model/notification.service';
import { locale } from 'src/app/core/_config/i18n/vi';

@Component({
  selector: 'kt-modal-delete-employee-work',
  templateUrl: './modal-delete-employee-work.component.html',
  styleUrls: ['./modal-delete-employee-work.component.scss']
})
export class ModalDeleteEmployeeWorkComponent implements OnInit {
  VI_LANG = locale.data;
  listIds: string[] = [];
  empID: string;
  loadingDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(public _NgbActiveModal: NgbActiveModal,
    private notiService: NotiService,
    private employeeWorkHistoryService: EmployeeWorkHistoryService) { }

  ngOnInit(): void {
    document.getElementById('confirmBtn').focus();
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  public cancel() {
    this.activeModal.close('thanh cong');
  }

  onSubmit() {
    this.loadingDelete.next(true);
    this.employeeWorkHistoryService.DeleteEmployeeWorking(this.empID, this.listIds).subscribe(() => {
      this.notiService.deleteSuccess();
      this._NgbActiveModal.close('ok');
      this.loadingDelete.next(false);
    }, error => this.loadingDelete.next(false))
  }

}

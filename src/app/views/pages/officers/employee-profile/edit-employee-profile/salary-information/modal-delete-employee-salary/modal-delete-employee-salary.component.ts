import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NotiService} from '../../../../../../../core/service/service-model/notification.service';
import {EmployeeSalaryService} from '../../../../../../../core/employee/salary/salary-employee.service';
import {locale} from "../../../../../../../core/_config/i18n/vi";

@Component({
  selector: 'kt-modal-delete-employee-salary',
  templateUrl: './modal-delete-employee-salary.component.html',
  styleUrls: ['./modal-delete-employee-salary.component.scss']
})
export class ModalDeleteEmployeeSalaryComponent implements OnInit {
  VI_LANG = locale.data;
  constructor(public _NgbActiveModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

}

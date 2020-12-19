import {Component, Input, OnInit} from '@angular/core';
import {EmployeeService} from "../../_services/employee.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BehaviorSubject} from "rxjs";
import {NotiService} from "../../core/service/service-model/notification.service";

@Component({
  selector: 'kt-modal-delete-employee',
  templateUrl: './modal-delete-employee.component.html',
  styleUrls: ['./modal-delete-employee.component.scss']
})
export class ModalDeleteEmployeeComponent implements OnInit {
  @Input() selectedItem: any;
  loadingDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(public _NgbActiveModal: NgbActiveModal,
              private employeeService: EmployeeService,
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
    this.employeeService.deleteEmployeeById(this.selectedItem._id).subscribe(() => {
      this.notiService.deleteSuccess();
      this.activeModal.close('delete');
      this.loadingDelete.next(false);
    }, error => this.loadingDelete.next(false))
  }
}

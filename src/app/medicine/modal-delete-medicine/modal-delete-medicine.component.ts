import {Component, Input, OnInit} from '@angular/core';
import {MedicineService} from "../../_services/medicine.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BehaviorSubject} from "rxjs";
import {NotiService} from "../../core/service/service-model/notification.service";

@Component({
  selector: 'kt-modal-delete-medicine',
  templateUrl: './modal-delete-medicine.component.html',
  styleUrls: ['./modal-delete-medicine.component.scss']
})
export class ModalDeleteMedicineComponent implements OnInit {
  @Input() selectedItem: any;
  loadingDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(public _NgbActiveModal: NgbActiveModal,
              private medicineService: MedicineService,
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
    this.medicineService.deleteMedicineById(this.selectedItem._id).subscribe(() => {
      this.notiService.deleteSuccess();
      this.activeModal.close('delete');
      this.loadingDelete.next(false);
    }, error => this.loadingDelete.next(false))
  }
}

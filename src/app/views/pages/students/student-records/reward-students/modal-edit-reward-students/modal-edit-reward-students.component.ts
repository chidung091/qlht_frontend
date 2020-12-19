import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-modal-edit-reward-students',
  templateUrl: './modal-edit-reward-students.component.html',
  styleUrls: ['./modal-edit-reward-students.component.scss']
})
export class ModalEditRewardStudentsComponent implements OnInit {

  constructor(private _NgbActiveModal: NgbActiveModal,) { }

  ngOnInit(): void {
  }
  get activeModal() {
    return this._NgbActiveModal;
  }

  public cancel() {
    this.activeModal.dismiss();
  }

  // get f() {
  //   return this.form.controls;
  // }
  onSubmit() {

  }
}

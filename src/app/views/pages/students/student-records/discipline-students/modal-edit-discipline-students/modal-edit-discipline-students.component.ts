import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-modal-edit-discipline-students',
  templateUrl: './modal-edit-discipline-students.component.html',
  styleUrls: ['./modal-edit-discipline-students.component.scss']
})
export class ModalEditDisciplineStudentsComponent implements OnInit {

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

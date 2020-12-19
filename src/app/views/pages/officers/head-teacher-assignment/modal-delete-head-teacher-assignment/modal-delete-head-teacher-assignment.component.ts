import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngxs/store";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'kt-modal-delete-head-teacher-assignment',
  templateUrl: './modal-delete-head-teacher-assignment.component.html',
  styleUrls: ['./modal-delete-head-teacher-assignment.component.scss']
})
export class ModalDeleteHeadTeacherAssignmentComponent implements OnInit {

  constructor(public _NgbActiveModal: NgbActiveModal,
              private store: Store) { }

  loadingDelete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ngOnInit(): void {
  }
  get activeModal() {
    return this._NgbActiveModal;
  }

  public cancel() {
    this.activeModal.close('thanh cong');
  }
  onSubmit(){}


}

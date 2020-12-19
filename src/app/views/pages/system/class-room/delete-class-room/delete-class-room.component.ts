import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {locale} from '../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-delete-class-room',
  templateUrl: './delete-class-room.component.html',
  styleUrls: ['./delete-class-room.component.scss']
})
export class DeleteClassRoomComponent implements OnInit {
  VI_LANG = locale.data;

  constructor(public _NgbActiveModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  get activeModal() {
    return this._NgbActiveModal;
  }
}

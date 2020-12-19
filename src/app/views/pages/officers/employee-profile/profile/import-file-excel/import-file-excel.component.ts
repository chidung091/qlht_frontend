import { Component, OnInit } from '@angular/core';
import {locale} from '../../../../../../core/_config/i18n/vi';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-import-file-excel',
  templateUrl: './import-file-excel.component.html',
  styleUrls: ['./import-file-excel.component.scss']
})
export class ImportFileExcelComponent implements OnInit {

  active = 1;
  VI_LANG = locale.data;

  constructor(
    private modal: NgbModal,
    private ActiveModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.ActiveModal.dismiss();
  }

  close() {
    this.ActiveModal.dismiss();
  }
}

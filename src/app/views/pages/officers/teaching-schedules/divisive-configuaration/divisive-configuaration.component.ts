import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-divisive-configuaration',
  templateUrl: './divisive-configuaration.component.html',
  styleUrls: ['./divisive-configuaration.component.scss']
})
export class DivisiveConfiguarationComponent implements OnInit {

  private statusModal: string; private keywordSearch: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public openModalAdd(contentAdd) {
    this.modalService.open(contentAdd, { size: 'lg', centered: true });
    this.statusModal = 'ADD';
  }

  public openModalEdit(contentEdit) {
    this.modalService.open(contentEdit, {size: 'lg', centered: true});
    this.statusModal = 'EDIT';
  }

  public openModalDelete(contentDelete) {
    this.modalService.open(contentDelete, {size: 'medium', centered: true});
  }

  public closeModal() {
    this.modalService.dismissAll();
  }

  getValueSearch(value) {
    this.keywordSearch = value;
    console.log(this.keywordSearch)
  }
}

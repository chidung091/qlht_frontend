import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-distribute-program',
  templateUrl: './distribute-program.component.html',
  styleUrls: ['./distribute-program.component.scss']
})
export class DistributeProgramComponent implements OnInit {

  listInOutput: Array<any> = [{
    text: 'Nhập từ Excel'
  }, {
    text: 'Xuất Excel'
  }];

  public statusModalAdd = false;

  public statusModalEdit = false;

  public statusModalDelete = false;

  public statusModalApplyMultiple = false;

  constructor() { }

  ngOnInit(): void {
  }

  public openModalAdd() {
    this.statusModalAdd = true;
  }

  public closeModalAdd() {
    this.statusModalAdd = false;
  }

  public openModalEdit() {
    this.statusModalEdit = true;
  }

  public closeModalEdit() {
    this.statusModalEdit = false;
  }

  public openModalDelete() {
    this.statusModalDelete = true;
  }

  public closeModalDelete() {
    this.statusModalDelete = false;
  }

  public openModalApplyMultiple() {
    this.statusModalApplyMultiple = true;
  }

  public closeModalApplyMultiple() {
    this.statusModalApplyMultiple = false;
  }
}

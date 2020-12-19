import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CatalogModel} from '../../../../../core/service/model/catalog.model';

@Component({
  selector: 'kt-configuration-grading',
  templateUrl: './configuration-grading.component.html',
  styleUrls: ['./configuration-grading.component.scss']
})
export class ConfigurationGradingComponent implements OnInit {
 public listData: Caltalog[] = [];

  constructor(private activeModal: NgbActiveModal) {
    this.listData.push({id: 'M1', maDanhMuc: 'M02', tenDanhMuc: 'Audio', maLoaiDanhMuc: '05'} as Caltalog)
  }

  ngOnInit(): void {
  }
  close() {
    this.activeModal.dismiss('click-close')
  }
  public add(){
    const a = new Caltalog();
    this.listData.push(a);
  }
}
export class Caltalog implements CatalogModel{
}

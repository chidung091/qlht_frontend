import { Component, OnInit } from '@angular/core';
import {SelectableSettings} from "@progress/kendo-angular-grid";
import {ExpWorkModel} from "./model/exp-work.model";
const EXPWORK_DEFAULT: ExpWorkModel[] = [
  {id: '1', nameWork: 'Bí thư chi bộ', lessonWeek: '3', descWork: ''},
  {id: '2', nameWork: 'Bí thư đoàn thanh niên', lessonWeek: '0', descWork: ''},
  {id: '3', nameWork: 'Công nghệ thông tin', lessonWeek: '0', descWork: ''},
  {id: '4', nameWork: 'Chủ nhiệm lớp', lessonWeek: '0', descWork: ''},
  {id: '5', nameWork: 'Chủ tịch Công đoàn', lessonWeek: '0', descWork: ''},
  {id: '6', nameWork: 'Giáo vụ', lessonWeek: '0', descWork: ''},
  {id: '7', nameWork: 'Hỗ trợ giáo dục người khuyết tật', lessonWeek: '0', descWork: ''},
  {id: '8', nameWork: 'Hướng nghiệp', lessonWeek: '0', descWork: ''},
  {id: '9', nameWork: 'Kế toán', lessonWeek: '0', descWork: ''},
  {id: '10', nameWork: 'Phó bí thư chi bộ', lessonWeek: '0', descWork: ''},
]
@Component({
  selector: 'kt-exp-work',
  templateUrl: './exp-work.component.html',
  styleUrls: ['./exp-work.component.scss']
})
export class ExpWorkComponent implements OnInit {
  expWorks = EXPWORK_DEFAULT;
  public gridData: any[] = this.expWorks;
  searchValue: any;
  actionDialog = '';
  data: any;
  rowsSelected: number[];
  public gridView: any[];
  public mySelection: string[] = [];
  _pageSize: number = 5;
  pageSizes: Array<number> = [10,20];
  public selectTableSetting: SelectableSettings = {
    checkboxOnly: true
  }
  constructor() { }

  ngOnInit(): void {
    this.gridView = this.gridData;
  }
  search(value){
    this.searchValue = value;
    alert(this.searchValue.expWorkValue);
  }
  setAction(at: string) {
    this.actionDialog = at;
  }
  deleteAction() {
    this.data = this.rowsSelected;
    this.setAction('delete');
  }
  public onChange(rows: number[]) {
    this.rowsSelected = rows;
  }
  editAction(dataItem: any) {
    this.data = dataItem;
    this.setAction('edit');
  }

}

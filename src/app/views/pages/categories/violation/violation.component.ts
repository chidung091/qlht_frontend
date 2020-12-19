import { Component, OnInit } from '@angular/core';
import {ViolationModel} from "./model/violation.model";
import {SelectableSettings} from "@progress/kendo-angular-grid";

const VIOLATION_DEFAULT: ViolationModel[] = [
  {id: 1, violation: 'Đi học muộn', type: 'Nội quy kỉ luật', pointMinus: 6.1, description: ''},
  {id: 2, violation: 'Đi học sớm', type: 'Nội quy kỉ luật', pointMinus: 6.2, description: ''},
  {id: 3, violation: 'Đi học trễ', type: 'Nội quy kỉ luật', pointMinus: 6.3, description: ''},
  {id: 4, violation: 'Quên đi học', type: 'Nội quy kỉ luật', pointMinus: 6.40, description: ''},
  {id: 5, violation: 'Đi lạc', type: 'Nội quy kỉ luật', pointMinus: 6.50, description: ''},
  {id: 6, violation: 'Đi chơi', type: 'Nội quy kỉ luật', pointMinus: 6.60, description: ''},
  {id: 7, violation: 'Đi la cà', type: 'Nội quy kỉ luật', pointMinus: 6.70, description: ''},
  {id: 8, violation: 'Đi không tới nơi', type: 'Nội quy kỉ luật', pointMinus: 6.80, description: ''},
  {id: 9, violation: 'Đi qua trường không vào', type: 'Nội quy kỉ luật', pointMinus: 6.90, description: ''},
  {id: 10, violation: 'Đi xe máy', type: 'Nội quy kỉ luật', pointMinus: 7.0, description: ''},
  {id: 11, violation: 'Đi ô tô', type: 'Nội quy kỉ luật', pointMinus: 7.10, description: ''},
  {id: 12, violation: 'Đi bộ nhưng chậm', type: 'Nội quy kỉ luật', pointMinus: 7.2, description: ''},
  {id: 13, violation: 'Đi xe đạp bốc đầu', type: 'Nội quy kỉ luật', pointMinus: 7.30, description: ''},
  {id: 14, violation: 'Đi lạng lách', type: 'Nội quy kỉ luật', pointMinus: 7.40, description: ''},
  {id: 15, violation: 'Đi đánh võng', type: 'Nội quy kỉ luật', pointMinus: 7.50, description: ''},
  {id: 16, violation: 'Đi tạt đầu oto', type: 'Nội quy kỉ luật', pointMinus: 7.60, description: ''},
  {id: 17, violation: 'Đi quá nhanh', type: 'Nội quy kỉ luật', pointMinus: 7.70, description: ''},
  {id: 18, violation: 'Đi vượt ẩu', type: 'Nội quy kỉ luật', pointMinus: 7.80, description: ''},
  {id: 19, violation: 'Đi đâm gốc cây', type: 'Nội quy kỉ luật', pointMinus: 7.90, description: ''},
  {id: 20, violation: 'Đi nhầm trường khác', type: 'Nội quy kỉ luật', pointMinus: 7.90, description: ''},
  {id: 21, violation: 'Đi học muộn', type: 'Nội quy kỉ luật', pointMinus: 6.1, description: ''},
  {id: 22, violation: 'Đi học sớm', type: 'Nội quy kỉ luật', pointMinus: 6.2, description: ''},
  {id: 23, violation: 'Đi học trễ', type: 'Nội quy kỉ luật', pointMinus: 6.3, description: ''},
  {id: 24, violation: 'Quên đi học', type: 'Nội quy kỉ luật', pointMinus: 6.40, description: ''},
  {id: 25, violation: 'Đi lạc', type: 'Nội quy kỉ luật', pointMinus: 6.50, description: ''},
  {id: 26, violation: 'Đi chơi', type: 'Nội quy kỉ luật', pointMinus: 6.60, description: ''},
  {id: 27, violation: 'Đi la cà', type: 'Nội quy kỉ luật', pointMinus: 6.70, description: ''},
  {id: 28, violation: 'Đi không tới nơi', type: 'Nội quy kỉ luật', pointMinus: 6.80, description: ''},
  {id: 29, violation: 'Đi qua trường không vào', type: 'Nội quy kỉ luật', pointMinus: 6.90, description: ''},
  {id: 30, violation: 'Đi xe máy', type: 'Nội quy kỉ luật', pointMinus: 7.0, description: ''},
  {id: 31, violation: 'Đi ô tô', type: 'Nội quy kỉ luật', pointMinus: 7.10, description: ''},
  {id: 32, violation: 'Đi bộ nhưng chậm', type: 'Nội quy kỉ luật', pointMinus: 7.2, description: ''},
  {id: 33, violation: 'Đi xe đạp bốc đầu', type: 'Nội quy kỉ luật', pointMinus: 7.30, description: ''},
  {id: 34, violation: 'Đi lạng lách', type: 'Nội quy kỉ luật', pointMinus: 7.40, description: ''},
  {id: 35, violation: 'Đi đánh võng', type: 'Nội quy kỉ luật', pointMinus: 7.50, description: ''},
  {id: 36, violation: 'Đi tạt đầu oto', type: 'Nội quy kỉ luật', pointMinus: 7.60, description: ''},
  {id: 37, violation: 'Đi quá nhanh', type: 'Nội quy kỉ luật', pointMinus: 7.70, description: ''},
  {id: 38, violation: 'Đi vượt ẩu', type: 'Nội quy kỉ luật', pointMinus: 7.80, description: ''},
  {id: 39, violation: 'Đi đâm gốc cây', type: 'Nội quy kỉ luật', pointMinus: 7.90, description: ''},
  {id: 40, violation: 'Đi nhầm trường khác', type: 'Nội quy kỉ luật', pointMinus: 7.90, description: ''},
  {id: 41, violation: 'Đi học muộn', type: 'Nội quy kỉ luật', pointMinus: 6.1, description: ''},
  {id: 42, violation: 'Đi học sớm', type: 'Nội quy kỉ luật', pointMinus: 6.2, description: ''},
  {id: 43, violation: 'Đi học trễ', type: 'Nội quy kỉ luật', pointMinus: 6.3, description: ''},
  {id: 44, violation: 'Quên đi học', type: 'Nội quy kỉ luật', pointMinus: 6.40, description: ''},
  {id: 45, violation: 'Đi lạc', type: 'Nội quy kỉ luật', pointMinus: 6.50, description: ''},
  {id: 46, violation: 'Đi chơi', type: 'Nội quy kỉ luật', pointMinus: 6.60, description: ''},
  {id: 47, violation: 'Đi la cà', type: 'Nội quy kỉ luật', pointMinus: 6.70, description: ''},
  {id: 48, violation: 'Đi không tới nơi', type: 'Nội quy kỉ luật', pointMinus: 6.80, description: ''},
  {id: 49, violation: 'Đi qua trường không vào', type: 'Nội quy kỉ luật', pointMinus: 6.90, description: ''},
  {id: 50, violation: 'Đi xe máy', type: 'Nội quy kỉ luật', pointMinus: 7.0, description: ''},
  {id: 51, violation: 'Đi ô tô', type: 'Nội quy kỉ luật', pointMinus: 7.10, description: ''},
  {id: 52, violation: 'Đi bộ nhưng chậm', type: 'Nội quy kỉ luật', pointMinus: 7.2, description: ''},
  {id: 53, violation: 'Đi xe đạp bốc đầu', type: 'Nội quy kỉ luật', pointMinus: 7.30, description: ''},
  {id: 54, violation: 'Đi lạng lách', type: 'Nội quy kỉ luật', pointMinus: 7.40, description: ''},
  {id: 55, violation: 'Đi đánh võng', type: 'Nội quy kỉ luật', pointMinus: 7.50, description: ''},
  {id: 56, violation: 'Đi tạt đầu oto', type: 'Nội quy kỉ luật', pointMinus: 7.60, description: ''},
  {id: 57, violation: 'Đi quá nhanh', type: 'Nội quy kỉ luật', pointMinus: 7.70, description: ''},
  {id: 58, violation: 'Đi vượt ẩu', type: 'Nội quy kỉ luật', pointMinus: 7.80, description: ''},
  {id: 59, violation: 'Đi đâm gốc cây', type: 'Nội quy kỉ luật', pointMinus: 7.90, description: ''},
  {id: 60, violation: 'Đi nhầm trường khác', type: 'Nội quy kỉ luật', pointMinus: 7.90, description: ''},
  {id: 61, violation: 'Đi học muộn', type: 'Nội quy kỉ luật', pointMinus: 6.1, description: ''},
  {id: 62, violation: 'Đi học sớm', type: 'Nội quy kỉ luật', pointMinus: 6.2, description: ''},
  {id: 63, violation: 'Đi học trễ', type: 'Nội quy kỉ luật', pointMinus: 6.3, description: ''},
  {id: 64, violation: 'Quên đi học', type: 'Nội quy kỉ luật', pointMinus: 6.40, description: ''},
  {id: 65, violation: 'Đi lạc', type: 'Nội quy kỉ luật', pointMinus: 6.50, description: ''},
  {id: 66, violation: 'Đi chơi', type: 'Nội quy kỉ luật', pointMinus: 6.60, description: ''},
  {id: 67, violation: 'Đi la cà', type: 'Nội quy kỉ luật', pointMinus: 6.70, description: ''},
  {id: 68, violation: 'Đi không tới nơi', type: 'Nội quy kỉ luật', pointMinus: 6.80, description: ''},
  {id: 69, violation: 'Đi qua trường không vào', type: 'Nội quy kỉ luật', pointMinus: 6.90, description: ''},
  {id: 70, violation: 'Đi xe máy', type: 'Nội quy kỉ luật', pointMinus: 7.0, description: ''},
  {id: 71, violation: 'Đi ô tô', type: 'Nội quy kỉ luật', pointMinus: 7.10, description: ''},
  {id: 72, violation: 'Đi bộ nhưng chậm', type: 'Nội quy kỉ luật', pointMinus: 7.2, description: ''},
  {id: 73, violation: 'Đi xe đạp bốc đầu', type: 'Nội quy kỉ luật', pointMinus: 7.30, description: ''},
  {id: 74, violation: 'Đi lạng lách', type: 'Nội quy kỉ luật', pointMinus: 7.40, description: ''},
  {id: 75, violation: 'Đi đánh võng', type: 'Nội quy kỉ luật', pointMinus: 7.50, description: ''},
  {id: 76, violation: 'Đi tạt đầu oto', type: 'Nội quy kỉ luật', pointMinus: 7.60, description: ''},
  {id: 77, violation: 'Đi quá nhanh', type: 'Nội quy kỉ luật', pointMinus: 7.70, description: ''},
  {id: 78, violation: 'Đi vượt ẩu', type: 'Nội quy kỉ luật', pointMinus: 7.80, description: ''},
  {id: 79, violation: 'Đi đâm gốc cây', type: 'Nội quy kỉ luật', pointMinus: 7.90, description: ''},
  {id: 80, violation: 'Đi nhầm trường khác', type: 'Nội quy kỉ luật', pointMinus: 7.90, description: ''},
  {id: 81, violation: 'Đi học muộn', type: 'Nội quy kỉ luật', pointMinus: 6.1, description: ''},
  {id: 82, violation: 'Đi học sớm', type: 'Nội quy kỉ luật', pointMinus: 6.2, description: ''},
  {id: 83, violation: 'Đi học trễ', type: 'Nội quy kỉ luật', pointMinus: 6.3, description: ''},
  {id: 84, violation: 'Quên đi học', type: 'Nội quy kỉ luật', pointMinus: 6.40, description: ''},
  {id: 85, violation: 'Đi lạc', type: 'Nội quy kỉ luật', pointMinus: 6.50, description: ''},
  {id: 86, violation: 'Đi chơi', type: 'Nội quy kỉ luật', pointMinus: 6.60, description: ''},
  {id: 87, violation: 'Đi la cà', type: 'Nội quy kỉ luật', pointMinus: 6.70, description: ''},
  {id: 88, violation: 'Đi không tới nơi', type: 'Nội quy kỉ luật', pointMinus: 6.80, description: ''},
  {id: 89, violation: 'Đi qua trường không vào', type: 'Nội quy kỉ luật', pointMinus: 6.90, description: ''},
  {id: 90, violation: 'Đi xe máy', type: 'Nội quy kỉ luật', pointMinus: 7.0, description: ''},
  {id: 91, violation: 'Đi ô tô', type: 'Nội quy kỉ luật', pointMinus: 7.10, description: ''},
  {id: 92, violation: 'Đi bộ nhưng chậm', type: 'Nội quy kỉ luật', pointMinus: 7.2, description: ''},
  {id: 93, violation: 'Đi xe đạp bốc đầu', type: 'Nội quy kỉ luật', pointMinus: 7.30, description: ''},
  {id: 94, violation: 'Đi lạng lách', type: 'Nội quy kỉ luật', pointMinus: 7.40, description: ''},
  {id: 95, violation: 'Đi đánh võng', type: 'Nội quy kỉ luật', pointMinus: 7.50, description: ''},

]

@Component({
  selector: 'kt-violation',
  templateUrl: './violation.component.html',
  styleUrls: ['./violation.component.scss']
})
export class ViolationComponent implements OnInit {

  searchValue: any;
  constructor() { }

  violations = VIOLATION_DEFAULT;

  public gridData: any[] = this.violations;
  public gridView: any[];
  public selectTableSetting: SelectableSettings = {
    checkboxOnly: true
  }
  public mySelection: string[] = [];

  pageSizes: Array<number> = [10,20];
  _pageSize: number = 5;

  actionDialog: string = '';
  isOpenDialog: boolean = false;
  data: any;
  rowsSelected: number[];

  ngOnInit(): void {
    this.gridView = this.gridData;
  }

  public onChange(rows: number[]) {
    this.rowsSelected = rows;
  }


  search(value) {
    this.searchValue = value;
    alert(this.searchValue.violationType + ' || ' + this.searchValue.violationValue);
  }

  setAction(at: string) {
    this.actionDialog = at;
  }

  editAction(dataItem: any) {
    this.data = dataItem;
    this.setAction('edit');
  }

  deleteAction() {
    this.data = this.rowsSelected;
    this.setAction('delete');
  }
}

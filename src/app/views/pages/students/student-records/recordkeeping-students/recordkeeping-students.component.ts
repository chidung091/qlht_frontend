import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-recordkeeping-students',
  templateUrl: './recordkeeping-students.component.html',
  styleUrls: ['./recordkeeping-students.component.scss']
})
export class RecordkeepingStudentsComponent implements OnInit {

  isCollapsed: boolean = true;
  checkDisableYear: boolean =false;
  public loading = true;
  pageSizes: Array<number> = [5, 10, 20];
  private skip = 0;
  private _pageSize = 5;
  private buttonCount = 5;


  constructor() { }

  ngOnInit(): void {
  }

  openModalAdd() {

  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    // this.loadData()
  }

}

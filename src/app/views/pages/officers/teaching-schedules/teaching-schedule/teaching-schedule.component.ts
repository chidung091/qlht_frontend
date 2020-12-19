import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-teaching-schedule',
  templateUrl: './teaching-schedule.component.html',
  styleUrls: ['./teaching-schedule.component.scss']
})
export class TeachingScheduleComponent implements OnInit {

  listInOutput: Array<any> = [{
    text: 'Xuất mẫu nhập'
  }, {
    text: 'Xuất sổ lịch báo giảng'
  }];

  Tetsadsnl: Array<any> = [{
    thu: 'Thứ 2', buoi: 'sang', tiet: ['1','2','3','4','5'], mon: null, phanmon: null,lop: null,tietPPCT: null,tenbaihoc: null
  }]

  constructor() { }

  ngOnInit(): void {
  }

  mergeGridRows(gridId, colTitle) {

  }

}

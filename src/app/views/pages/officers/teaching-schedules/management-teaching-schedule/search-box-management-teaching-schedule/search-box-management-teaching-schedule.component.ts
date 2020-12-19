import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-search-box-management-teaching-schedule',
  templateUrl: './search-box-management-teaching-schedule.component.html',
  styleUrls: ['./search-box-management-teaching-schedule.component.scss']
})
export class SearchBoxManagementTeachingScheduleComponent implements OnInit {

  openModalSearchBody = true;

  defaultReportType: Array<{ id: string; nameReportType: string }> = [{id: '1', nameReportType: 'Theo giáo viên'},{id: '2', nameReportType: 'Theo lớp học'}];
  defaultStatus: Array<{ id: string; valueStatus: string }> = [{id: '1', valueStatus: '[Tất cả]'},{id: '2', valueStatus: 'Đã lên lịch'},
    {id: '3', valueStatus: 'Chưa lên lịch'},{id: '2', valueStatus: 'Đã phê duyệt'},
    {id: '4', valueStatus: 'Chưa phê duyệt'},{id: '5', valueStatus: 'Hủy phê duyệt'}];

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {Store} from '@ngxs/store';
import {GetManagerments} from '../../../../../../core/service/actions/managerment-action';
import {Observable} from 'rxjs';
import {ManagementModel} from '../../../../../../core/service/model/management.model';
import {ManagermentState} from '../../../../../../core/service/states/managerment.state';

@Component({
  selector: 'kt-search-box-teaching-schedule',
  templateUrl: './search-box-teaching-schedule.component.html',
  styleUrls: ['./search-box-teaching-schedule.component.scss']
})
export class SearchBoxTeachingScheduleComponent implements OnInit {

  openModalSearchBody = true;

  listTeacher: Observable<ManagementModel[]>;

  defaultSession: Array<{ id: string; nameSession: string }> = [{id: '1', nameSession: '[Tất cả]'},{id: '2', nameSession: 'Sáng'},
    {id: '3', nameSession: 'Chiều'},{id: '4', nameSession: 'Tối'}];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getAllTeacher();

    this.listTeacher.subscribe(data => {
    });
  }

  // Get danh sách giáo viên
  getAllTeacher() {
    this.store.dispatch(new GetManagerments());
    this.listTeacher = this.store.select(ManagermentState.manager);
  }
}

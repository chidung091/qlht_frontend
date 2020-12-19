import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {addWeeks, Day, firstDayInWeek, isEqual} from "@progress/kendo-date-math";

@Component({
  selector: 'kt-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrls: ['./take-attendance.component.scss']
})
export class TakeAttendanceComponent implements OnInit {
  public _expandedKeys: any[] = ['Khối 1'];
  public _dataItems: Array<any> = [{
    text: 'My Profile'
  }, {
    text: 'Friend Requests'
  }, {
    text: 'Account Settings'
  }, {
    text: 'Support'
  }, {
    text: 'Log Out'
  }];
  public _data: any[] = [
    {
      text: 'Khối 1',
      items: [
        {text: 'Lớp 1A'},
        {text: 'Lớp 1B'},
        {text: 'Lớp 1 Gốc Sấu'},
        {text: 'Lớp 1C'}
      ]
    }, {
      text: 'Khối 2',
      items: [
        {text: 'Lớp 2A'},
        {text: 'Lớp 2B'},
        {text: 'Lớp 2 Gốc Sấu'},
        {text: 'Lớp 2C'}
      ]
    }, {
      text: 'Khối 3',
      items: [
        {text: 'Lớp 3A'},
        {text: 'Lớp 3B'},
        {text: 'Lớp 3 Gốc Sấu'},
        {text: 'Lớp 3C'}
      ]
    }, {
      text: 'Khối 4',
      items: [
        {text: 'Lớp 4A'},
        {text: 'Lớp 4B'},
        {text: 'Lớp 4 Gốc Sấu'},
        {text: 'Lớp 4C'}
      ]
    }, {
      text: 'Khối 5',
      items: [
        {text: 'Lớp 5A'},
        {text: 'Lớp 5B'},
        {text: 'Lớp 5 Gốc Sấu'},
        {text: 'Lớp 5C'}
      ]
    },
  ];
  _dateNow: string = new Date().getTime().toString();
  _day: Array<any> = ['1', '2', '3', '4', '5', '6', '7']
  _month: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '12']
  public _selectedKeys: any[] = ['Lớp 1A'];
  _items: Array<string> = ['Đang hoạt đông', 'Dừng hoạt đông'];
  _valueDefault = 'Tất cả';
  _valueMonth = '10';
  _isSaturday: boolean = false;
  _isSunday: boolean = false;


  constructor() {
  }

  ngOnInit(): void {
    // this.testDate();
  }

  public fetchChildren(node: any): Observable<any[]> {
    //Return the items collection of the parent node as children.
    console.log(node.items);
    return of(node.items);
  }


  // checkDay(day:number){
  //   if (day==Day.Saturday){
  //     this._isSaturday=true;
  //   }else {
  //     this._isSaturday=false;
  //   }
  //   if (day==Day.Sunday){
  //     this._isSunday=true;
  //   }else {
  //     this._isSunday=false;
  //   }
  //   console.log(this._isSunday)
  // }
  // testDate(){
  //   let date = new Date().getDay();
  //   // date.getDay();
  //   // const weeks = addWeeks(date,20);
  //   const day = Day;
  //   if (date==day.Friday){
  //     console.log('true');
  //   }
  //   console.log(day.Tuesday);
  //   console.log(day.Thursday);
  // }
}

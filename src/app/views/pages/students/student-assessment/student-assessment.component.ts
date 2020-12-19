import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'kt-student-assessment',
  templateUrl: './student-assessment.component.html',
  styleUrls: ['./student-assessment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentAssessmentComponent implements OnInit {

  // listClass = [
  //   {text: 'Toán', id: 1},
  //   {text: 'Tiếng việt', id: 2},
  //   {text: 'Khoa học', id: 3},
  //   {text: 'Tự nhiên và xã hội', id: 4},
  //   {text: 'Lịch sử và địa lý', id: 5},
  // ]
  show2 = 0;
  listMonhoc: Array<any> = [
    { Mon: 'Tất cả', stt: 0 },
    { Mon: 'Tiếng Việt', stt: 1 },
    { Mon: 'Toán', stt: 2 },
    { Mon: 'Khoa Học', stt: 3 },
    { Mon: 'Tự Nhiên và Xã Hội', stt: 4 },
    { Mon: 'Lịch sử và địa lý', stt: 5 },
    { Mon: 'Tiếng anh', stt: 6 },
    { Mon: 'Tin học', stt: 7 },
    { Mon: 'Đạo đức', stt: 8 },
    { Mon: 'Thể dục', stt: 9 },
    { Mon: 'Âm nhạc', stt: 10 },
    { Mon: 'chưa biết', stt: 11 }
  ];

  settings: Array<any> = [{
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
  constructor() { }

  ngOnInit(): void {
  }

  pageListMonhocNext() {
    if (this.show2 < this.listMonhoc.length - 8) {
      this.show2 = this.show2 + 1;
    }
  }
  pageListMonhocBack() {
    if (this.show2 > 0) {
      this.show2 = this.show2 - 1;
    }
  }

}

// import { Event } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'kt-comment-book',
  templateUrl: './comment-book.component.html',
  styleUrls: ['./comment-book.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentBookComponent implements OnInit {

  public _data: any[] = [
    {
      text: 'Khối 1',
      items: [
        { text: 'Lớp 1A' },
        { text: 'Lớp 1B' },
        { text: 'Lớp 1 Gốc Sấu' },
        { text: 'Lớp 1C' }
      ]
    }, {
      text: 'Khối 2',
      items: [
        { text: 'Lớp 2A' },
        { text: 'Lớp 2B' },
        { text: 'Lớp 2 Gốc Sấu' },
        { text: 'Lớp 2C' }
      ]
    }, {
      text: 'Khối 3',
      items: [
        { text: 'Lớp 3A' },
        { text: 'Lớp 3B' },
        { text: 'Lớp 3 Gốc Sấu' },
        { text: 'Lớp 3C' }
      ]
    }, {
      text: 'Khối 4',
      items: [
        { text: 'Lớp 4A' },
        { text: 'Lớp 4B' },
        { text: 'Lớp 4 Gốc Sấu' },
        { text: 'Lớp 4C' }
      ]
    }, {
      text: 'Khối 5',
      items: [
        { text: 'Lớp 5A' },
        { text: 'Lớp 5B' },
        { text: 'Lớp 5 Gốc Sấu' },
        { text: 'Lớp 5C' }
      ]
    },
  ];

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

  listBtn: Array<any> = [
    {
      text: 'Nhập từ Excel',
      url: 'aaa.com'
    },
    {
      text: 'Xuất mẫu Import',
      url: 'bbb.com'
    },
    {
      text: 'Xuất Excel thông tin học sinh',
      url: 'ccc.com'
    },
  ];

  listMon: Array<any> = [
    { mon: 'tháng 1', number: 1 },
    { mon: 'tháng 2', number: 2 },
    { mon: 'tháng 3', number: 3 },
    { mon: 'tháng 4', number: 4 },
    { mon: 'tháng 5', number: 5 },
    { mon: 'tháng 6', number: 6 },
    { mon: 'tháng 7', number: 7 },
    { mon: 'tháng 8', number: 8 },
    { mon: 'tháng 9', number: 9 },
    { mon: 'tháng 10', number: 10 },
    { mon: 'tháng 11', number: 11 },
    { mon: 'tháng 12', number: 12 },

  ];
  listday: Array<any> = [
    { day: '1' },
    { day: '2' }
  ];

  public data: any[] = [
    {
      text: 'lớp 10', items: [
        { text: 'lớp 10a' },
        { text: 'lớp 10b' },
        { text: 'lớp 10c' }
      ]
    },
    {
      text: 'lớp 11', items: [
        { text: 'lớp 11b' },
        { text: 'lớp 11c' },
        { text: 'lớp 11a' }
      ]
    }
  ];
  show: boolean = false;
  show2 = 0;

  selectedKeys = ['Lớp Học'];
  expandedKeys: any[] = [''];

  public hasChildren = (item: any) => item.items && item.items.length > 0;
  public fetchChildren = (item: any) => of(item.items);

  public onToggle(): void {
    this.show = !this.show;
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

  public handleSelection({ index }: any): void {
    this.show = false;
  }

  dateForm: FormGroup = new FormGroup({
    userName: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  isloading: boolean;

  gridView: Array<any>;
  _pageSize: number;
  skip;
  mySelection;


  show1 = true;

  constructor() { }

  ngOnInit(): void {
  }


}

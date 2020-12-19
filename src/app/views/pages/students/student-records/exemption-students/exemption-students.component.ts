import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-exemption-students',
  templateUrl: './exemption-students.component.html',
  styleUrls: ['./exemption-students.component.scss']
})
export class ExemptionStudentsComponent implements OnInit {

  isCollapsed: boolean = false;

  public listBlock: Array<{ text: string, value: any }> = [
    { text: "[Tất cả]", value: "all" },
    { text: "Khối 1", value: "khoi1" },
    { text: "Khối 2", value: "khoi2" },
    { text: "Khối 3", value: "khoi3" },
    { text: "Khối 4", value: "khoi4" },
  ];

  public listClass: Array<{ text: string, value: any }> = [
    { text: "[Tất cả]", value: "all" },
    { text: "Lớp 1", value: "khoi1" },
    { text: "Lớp 2", value: "khoi2" },
    { text: "Lớp 3", value: "khoi3" },
    { text: "Lớp 4", value: "khoi4" },
  ];

  public sex: Array<{ text: string, value: any }> = [
    { text: "Nam", value: "khoi1" },
    { text: "Nữ", value: "khoi2" },
    { text: "Khác", value: "khoi2" },
  ];

  public listStatus: Array<{ text: string, value: any }> = [
    { text: "tt1", value: "khoi1" },
    { text: "tt2", value: "khoi2" },
    { text: "tt3", value: "khoi2" },
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}

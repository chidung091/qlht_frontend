import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-detail-subjects',
  templateUrl: './detail-subjects.component.html',
  styleUrls: ['./detail-subjects.component.scss']
})
export class DetailSubjectsComponent implements OnInit {

  gridView: any;
  mySelection: any;
  pageSizes: any;
  _pageSize: any;
  buttonCount: any;

  constructor() { }

  ngOnInit(): void {
  }

  
  pageSizeChange() {

  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-detail-comment-book',
  templateUrl: './detail-comment-book.component.html',
  styleUrls: ['./detail-comment-book.component.scss']
})
export class DetailCommentBookComponent implements OnInit {

  gridView: Array<any>;
  _pageSize: number;
  skip;
  mySelection;

  constructor() { }

  ngOnInit(): void {
  }

  pageChange(Event) { }
  onChange(Event) { }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  _isCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}

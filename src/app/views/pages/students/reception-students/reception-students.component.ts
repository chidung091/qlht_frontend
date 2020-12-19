import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-reception-students',
  templateUrl: './reception-students.component.html',
  styleUrls: ['./reception-students.component.scss']
})
export class ReceptionStudentsComponent implements OnInit {
  active=1;
  constructor() { }

  ngOnInit(): void {
  }

}

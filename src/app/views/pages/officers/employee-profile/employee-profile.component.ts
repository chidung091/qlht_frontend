import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  active = 1;

  constructor() { }

  ngOnInit(): void {
  }

}

import { EmployeeService } from './../../../../../core/service/service-model/employee.service';
import { EmployeeProfileModel } from './../../../../../core/service/model/Employee-profile';
import { Department } from './../../../../../core/service/model/department.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-edit-employee-profile',
  templateUrl: './edit-employee-profile.component.html',
  styleUrls: ['./edit-employee-profile.component.scss']
})
export class EditEmployeeProfileComponent implements OnInit {
    active = 1;
    empId: string;
    employee: EmployeeProfileModel;
  constructor(private route: ActivatedRoute,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }
}

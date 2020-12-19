import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-detail-profile-student',
  templateUrl: './detail-profile-student.component.html',
  styleUrls: ['./detail-profile-student.component.scss']
})
export class DetailProfileStudentComponent implements OnInit {

  active = 1;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
   
  }

}

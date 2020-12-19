import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-commendation-discipline',
  templateUrl: './commendation-discipline.component.html',
  styleUrls: ['./commendation-discipline.component.scss']
})
export class CommendationDisciplineComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // console.log(this.route.snapshot.queryParamMap.get('studentId'))
  }

}

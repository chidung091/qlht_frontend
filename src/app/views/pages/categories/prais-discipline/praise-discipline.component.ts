import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'kt-reward-discipline',
  templateUrl: './praise-discipline.component.html',
  styleUrls: ['./praise-discipline.component.scss']
})
export class PraiseDisciplineComponent implements OnInit {
  selectedTab = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkStep();
  }

  onTabSelect(e) {
    if (e.index === 0) {
      this.router.navigate(['/categories/praise-discipline']);
    }  else if (e.index === 1) {
      this.router.navigate(['/categories/praise-discipline/discipline']);
    }
    this.selectedTab = e.index
  }

  checkStep() {
    if (this.router.url === '/categories/praise-discipline') {
      this.selectedTab = 0;
    } else if (this.router.url === '/categories/praise-discipline/discipline') {
      this.selectedTab = 1;
    }
  }

}

import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'kt-search1',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  isCollapsed: boolean = true;
  classDisable = true;
  form: FormGroup;
  @Input() component: string;
  @Output() submitSearch = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'kt-action-violation',
  templateUrl: './action-violation.component.html',
  styleUrls: ['./action-violation.component.scss']
})
export class ActionViolationComponent implements OnInit {

  @Input() action: string;
  @Input() data: any;
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  checkData() {
  }

  save() {
    alert('save');
    this.close.emit();
  }

}

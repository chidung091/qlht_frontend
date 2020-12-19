import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'kt-action-exp-work',
  templateUrl: './action-exp-work.component.html',
  styleUrls: ['./action-exp-work.component.scss']
})
export class ActionExpWorkComponent implements OnInit {
  @Input() action: string;
  @Input() data: any;
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  save() {
    alert('save');
    this.close.emit();
  }


}

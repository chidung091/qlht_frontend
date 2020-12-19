import { Component, OnInit } from '@angular/core';
import {locale} from '../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-according-teacher',
  templateUrl: './according-teacher.component.html',
  styleUrls: ['./according-teacher.component.scss']
})
export class AccordingTeacherComponent implements OnInit {

  isCollapsed = false;
  VI_LANG = locale.data;
  active: 1;
  defaultItem: {id: string, value: string} = {id: null, value: 'Lựa chọn'};

  constructor() { }

  ngOnInit(): void {
  }

}

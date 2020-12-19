import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {ExperienceTypeModel} from '../../../../../core/service/model/experience-type.model';
import {Select, Store} from '@ngxs/store';

import {BehaviorSubject, Observable} from 'rxjs';
import {ExperienceTypeState} from '../../../../../core/service/states/experience-type.state';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {locale} from '../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-action-experience-type',
  templateUrl: './action-experience-type.component.html',
  styleUrls: ['./action-experience-type.component.scss']
})
export class ActionExperienceTypeComponent implements OnInit, AfterViewInit {
  VI_LANG = locale.data
  @Input() action: string;
  @Input() data: ExperienceTypeModel;
  // tslint:disable-next-line:no-output-native
  @Output() close = new EventEmitter();
  @Output() expTypePost = new EventEmitter();
  @Output() expTypePut = new EventEmitter();
  @ViewChild('tenSangKienKinhNghiem') elementRef: ElementRef;
  experienceTypeAction: ExperienceTypeModel;
  textExp: string;
  loading: boolean;
  noChange = false;
  public dataExp: any = {
    id: '',
    creationTime: '',
    name: '',
    description: ''
  }
  public form: FormGroup

  constructor(private notiService: NotiService,
              public activeModal: NgbActiveModal
  ) {
    this.form = new FormGroup({
      id: new FormControl(this.dataExp.id, []),
      creationTime: new FormControl(this.dataExp.creationTime, []),
      name: new FormControl(this.dataExp.name, [Validators.required, Validators.maxLength(250)]),
      description: new FormControl(this.dataExp.description, [Validators.maxLength(250)])
    })
  }

  ngOnInit(): void {
    if (this.action === 'edit') {
      // this.textExp = 'Cập nhật sáng kiến kinh nghiệm';
      this.form.patchValue({
        id: this.data.id,
        name: this.data.name,
        description: this.data.description
      })
    } else if (this.action === 'create') {
      // this.textExp = 'Thêm mới sáng kiến kinh nghiệm';
      this.form.patchValue({
        name: '',
        description: ''
      })
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 100)
  }

  actionExp() {
      if (this.action === 'create') {
        // this.loading = true;
        this.expTypePost.emit(this.form)
      } else if (this.action === 'edit') {
        // this.loading = true;
        this.expTypePut.emit(this.form);
      }
    // }
  }
  formatvalue() {
    let note = ''
    if (this.form.value.name) {
      note = this.form.value.name.trim();
    }
    this.form.patchValue({
      name: note
    })}
}

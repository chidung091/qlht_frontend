import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConcurrentWorkTypeModel} from '../../../../../core/service/model/concurrent-work-type.model';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {locale} from '../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-action-concurrent-work-type',
  templateUrl: './action-concurrent-work-type.component.html',
  styleUrls: ['./action-concurrent-work-type.component.scss']
})
export class ActionConcurrentWorkTypeComponent implements OnInit, AfterViewInit {
  VI_LANG = locale.data
  @Input() action: string;
  @Input() data: any;
  @Output() close = new EventEmitter();
  @Output() conPut = new EventEmitter();
  @ViewChild('soTiet') elementRef: ElementRef;
  form: FormGroup;
  concurrentWorkTypePut: ConcurrentWorkTypeModel;
  openEditCon = false;
  loading: boolean;
  public dataCon: any = {
    id: '',
    creationTime: '',
    name: '',
    sectionPerWeek: null,
    description: '',
  }

  constructor(private notiService: NotiService) {
    this.form = new FormGroup({
      id: new FormControl(this.dataCon.id, []),
      creationTime: new FormControl(this.dataCon.creationTime, []),
      name: new FormControl(this.dataCon.name, [Validators.required, Validators.maxLength(250)]),
      sectionPerWeek: new FormControl(this.dataCon.sectionPerWeek, [Validators.pattern('[0-9]*'), Validators.maxLength(2), Validators.max(99)]),
      description: new FormControl(this.dataCon.description, [Validators.maxLength(250)]),
    })
  }

  ngOnInit(): void {
    this.form.patchValue({
      id: this.data.id,
      name: this.data.name,
      sectionPerWeek: this.data.sectionPerWeek,
      description: this.data.description
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 100)
  }

  save() {
    this.close.emit();
  }

  openEdit() {
    if (this.form.valid) {
      this.openEditCon = true;
    }
  }

  edit() {
    this.conPut.emit(this.form);
    // this.openEditCon = false;
    // this.close.emit();
  }

  public closed(status) {
    this.openEditCon = false;
  }
}

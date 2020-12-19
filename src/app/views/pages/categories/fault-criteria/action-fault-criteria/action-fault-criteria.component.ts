import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FaultCriteriaModel} from '../../../../../core/service/model/fault-criteria.model';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {locale} from '../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-action-fault-criteria',
  templateUrl: './action-fault-criteria.component.html',
  styleUrls: ['./action-fault-criteria.component.scss']
})
export class ActionFaultCriteriaComponent implements OnInit, AfterViewInit {
VI_LANG = locale.data
  @Input() action: string;
  @Input() data: any;
  @Output() closeAction = new EventEmitter();
  @Output() faultPost = new EventEmitter();
  @Output() faultPut = new EventEmitter();
  @ViewChild('tenLoiViPham') elementRef: ElementRef;
  @ViewChild('diemTru') mark: ElementRef;
  form: FormGroup;
  faultCriteriaAction: FaultCriteriaModel;
  textFC: string;
  listDiemDanh = [{id: 1, tenLoiDiemDanh: 'Có phép'}, {id: 0, tenLoiDiemDanh: 'Không phép'}]
  defaultF = {id: null, tenLoiDiemDanh: '[Lựa chọn]'}
  absenceFault: number;
  loading: boolean;
  noChange = false;
  public dataFault: any = {
    id: '',
    creationTime: '',
    name: '',
    minusMark: null,
    description: '',
    absenceFault: null
  }

  constructor(private notiService: NotiService) {
    this.form = new FormGroup({
      id: new FormControl(this.dataFault.id, []),
      creationTime: new FormControl(this.dataFault.creationTime, []),
      name: new FormControl(this.dataFault.name, [Validators.required, Validators.maxLength(250)]),
      minusMark: new FormControl(this.dataFault.minusMark, [Validators.required, Validators.pattern('^[0-9]*[.]?[0-9]$'),
        Validators.maxLength(4), Validators.max(9999)]),
      description: new FormControl(this.dataFault.description, [Validators.maxLength(250)]),
      absenceFault: new FormControl(this.dataFault.absenceFault, [])
    })
  }

  ngOnInit(): void {
    if (this.action === 'edit') {
      // this.textFC = 'Sửa lỗi lỗi vi phạm';
      this.form.patchValue({
        id: this.data.id,
        name: this.data.name,
        minusMark: this.data.minusMark,
        absenceFault: this.data.absenceFault,
        description: this.data.description,
      })
    } else if (this.action === 'create') {
      // this.textFC = 'Thêm mới lỗi vi phạm';
      this.form.patchValue({
        name: '',
        minusMark: null,
        absenceFault: null,
        description: '',
      })
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 100)
  }

  actionFC() {

    if (this.action === 'create') {
      if(this.form.value.name !== '' && this.form.value.minusMark === null){
        this.mark.nativeElement.focus();
      }
      // this.loading = true;
      this.faultPost.emit(this.form)
    } else if (this.action === 'edit') {
      // this.loading = true;
      this.faultPut.emit(this.form);
    }
  }
}

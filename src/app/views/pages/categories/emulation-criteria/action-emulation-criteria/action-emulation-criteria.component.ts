import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmulationCriteriaModel} from '../../../../../core/service/model/emulation-criteria.model';
import {Store} from '@ngxs/store';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {locale} from '../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-action-emulation-criteria',
  templateUrl: './action-emulation-criteria.component.html',
  styleUrls: ['./action-emulation-criteria.component.scss']
})
export class ActionEmulationCriteriaComponent implements OnInit, AfterViewInit {
  VI_LANG = locale.data
  @Input() action: string;
  @Input() data: any;
  @Output() close = new EventEmitter();
  @Output() emuPost = new EventEmitter();
  @Output() emuPut = new EventEmitter();
  @ViewChild('tenLoaiDiemThiDua') elementRef: ElementRef;
  @ViewChild('diemChuan') mark: ElementRef;
  form: FormGroup;
  emulationCriteriaAction: EmulationCriteriaModel;
  loading: boolean;
  textEC: string;
  noChange = false;
  regex: string = "^[a-zA-Z0-9_\\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*[^!@#$%^&*()+';/|+-]$"
  public dataEmu: any = {
    id: '',
    creationTime: '',
    competitionMarkType: '',
    benchmark: ''
  }

  constructor(private store: Store,
              private notiService: NotiService) {
    this.form = new FormGroup({
      id: new FormControl(this.dataEmu.id, []),
      creationTime: new FormControl(this.dataEmu.creationTime, []),
      competitionMarkType: new FormControl(this.dataEmu.competitionMarkType, [Validators.required, Validators.maxLength(250), Validators.pattern(this.regex)]),
      benchmark: new FormControl(this.dataEmu.benchmark, [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(4), Validators.max(9999)])
    })
  }

  ngOnInit(): void {
    if (this.action === 'edit') {
      this.textEC = 'Cập nhật loại điểm thi đua';
      this.form.patchValue({
        id: this.data.id,
        competitionMarkType: this.data.competitionMarkType,
        benchmark: this.data.benchmark
      })
    } else if (this.action === 'create') {
      // this.textEC = 'Thêm mới điểm thi đua'
      this.form.patchValue({
        competitionMarkType: '',
        benchmark: ''
      })
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 100)
  }

  actionEC() {
    if (this.action === 'create') {
      // debugger
      // this.loading = true;
      // cons
      if(this.form.value.competitionMarkType !== '' && this.form.value.benchmark === ''){
        this.mark.nativeElement.focus();
      }
      this.emuPost.emit(this.form)
      // this.close.emit('');
    } else if (this.action === 'edit') {
      // this.loading = true;
      this.emuPut.emit(this.form);
    }
    // this.close.emit('');
  }
}

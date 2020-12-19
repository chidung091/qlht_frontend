import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PraiseDisciplineTypeModel} from '../../../../../../core/service/model/praise-discipline-type.model';
import {NotiService} from '../../../../../../core/service/service-model/notification.service';
import {PraiseDisciplineTypeService} from '../../../../../../core/service/service-model/praise-discipline-type.service';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {locale} from '../../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-action-reward',
  templateUrl: './action-praise.component.html',
  styleUrls: ['./action-praise.component.scss']
})
export class ActionPraiseComponent implements OnInit, AfterViewInit {
  VI_LANG = locale.data
  @Input() action: string;
  @Input() data: any;
  @Output() close = new EventEmitter();
  @Output() prPost = new EventEmitter();
  @Output() prPut = new EventEmitter();
  @ViewChild('noiDung') elementRef: ElementRef;
  @ViewChild('congHanhKiem') congHanhKiem: ElementRef;
  @ViewChild('diemCong') diemCong: ElementRef;
  // @Input() focusInvalid: string;
  form: FormGroup;
  praiseAction: PraiseDisciplineTypeModel;
  textPr: string;
  model = {
    terms: false,
  };
  model2 = {
    duocCongDiemTotNghiep: false,
  }
  loading: boolean;
  noChange = false;
  saveF = 'Save Fail';
  public dataPraise: any = {
    id: '',
    creationTime: '',
    content: '',
    duocCongDiemHanhKiem: false,
    plusMarkConduct: null,
    duocCongDiemTotNghiep: false,
    plusMarkGraduation: null,
    type: 0
  }

  constructor(private notiService: NotiService,
              private praiseDisciplineTypeService: PraiseDisciplineTypeService) {
    this.form = new FormGroup({
      id: new FormControl(this.dataPraise.id, []),
      creationTime: new FormControl(this.dataPraise.creationTime, []),
      content: new FormControl(this.dataPraise.content, [Validators.required, Validators.maxLength(250)]),
      duocCongDiemHanhKiem: new FormControl(this.dataPraise.duocCongDiemHanhKiem, []),
      plusMarkConduct: new FormControl(this.dataPraise.plusMarkConduct, [Validators.required, Validators.pattern('^[0-9]*[.]?[0-9]$'),
        Validators.maxLength(4), Validators.max(9999)]),
      duocCongDiemTotNghiep: new FormControl(this.dataPraise.duocCongDiemTotNghiep, []),
      plusMarkGraduation: new FormControl(this.dataPraise.plusMarkGraduation, [Validators.required, Validators.pattern('^[0-9]*[.]?[0-9]$'),
        Validators.maxLength(4), Validators.max(9999)]),
      type: new FormControl(this.dataPraise.type, []),
    })

    if (this.form.value.duocCongDiemHanhKiem) {
      this.form.get('plusMarkConduct').enable();
    } else this.form.get('plusMarkConduct').disable();
    if (this.form.value.duocCongDiemTotNghiep) {
      this.form.get('plusMarkGraduation').enable();
    } else {
      this.form.get('plusMarkGraduation').disable();
    }
  }


  ngOnInit(): void {
    if (this.action === 'edit') {
      // this.textPr = 'Cập nhật khen thưởng';
      if(this.data.plusMarkConduct !== null){
        this.dataPraise.duocCongDiemHanhKiem = true
      }
      if(this.data.plusMarkGraduation !== null){
        this.dataPraise.duocCongDiemTotNghiep = true
      }
      if (this.data.plusMarkConduct) {
        this.form.get('plusMarkConduct').enable();
      } else {
        this.form.get('plusMarkConduct').disable();
      }
      if (this.data.plusMarkGraduation) {
        this.form.get('plusMarkGraduation').enable();
      } else {
        this.form.get('plusMarkGraduation').disable();
      }
      this.form.patchValue({
        id: this.data.id,
        content: this.data.content,
        duocCongDiemHanhKiem: this.dataPraise.duocCongDiemHanhKiem,
        plusMarkConduct: this.data.plusMarkConduct,
        duocCongDiemTotNghiep: this.dataPraise.duocCongDiemTotNghiep,
        plusMarkGraduation: this.data.plusMarkGraduation,
        type: this.dataPraise.type
      })
    } else if (this.action === 'create') {
      // this.textPr = 'Thêm mới khen thưởng';
      this.form.patchValue({
        content: '',
        duocCongDiemHanhKiem: false,
        plusMarkConduct: '',
        duocCongDiemTotNghiep: false,
        plusMarkGraduation: '',
        type: this.dataPraise.type
      })
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 100)
  }

  actionPR() {
    if (this.action === 'create') {
      // this.loading = true;
      this.prPost.emit(this.form)
    } else if (this.action === 'edit') {
      // this.loading = true;
      this.prPut.emit(this.form);
    }
    if(this.saveF === 'Save Fail' && this.form.value.content === '' ){
      this.elementRef.nativeElement.focus()
    }
  }

  check() {
    this.saveF = 'Check';
    if (!this.form.value.duocCongDiemHanhKiem) {
      this.form.get('plusMarkConduct').enable();
      this.congHanhKiem.nativeElement.focus();
    } else this.form.get('plusMarkConduct').disable();
  }

  check2() {
    this.saveF = 'Check';
    if (!this.form.value.duocCongDiemTotNghiep) {
      this.form.get('plusMarkGraduation').enable();
      this.diemCong.nativeElement.focus();
    } else this.form.get('plusMarkGraduation').disable();
  }

  formatvalue() {
    let note = ''
    if (this.form.value.content !== undefined) {
      note = this.form.value.content.trim();
    }
    this.form.patchValue({
      content: note
    })
  }
}

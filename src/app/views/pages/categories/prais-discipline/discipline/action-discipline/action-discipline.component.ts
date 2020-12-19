import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PraiseDisciplineTypeModel} from '../../../../../../core/service/model/praise-discipline-type.model';
import {NotiService} from '../../../../../../core/service/service-model/notification.service';
import {PraiseDisciplineTypeService} from '../../../../../../core/service/service-model/praise-discipline-type.service';
import {locale} from '../../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-action-discipline',
  templateUrl: './action-discipline.component.html',
  styleUrls: ['./action-discipline.component.scss']
})
export class ActionDisciplineComponent implements OnInit, AfterViewInit {
  VI_LANG = locale.data
  @Input() action: string;
  @Input() data: any;
  @Output() close = new EventEmitter();
  @Output() disPost = new EventEmitter();
  @Output() disPut = new EventEmitter();
  @ViewChild('noiDung') elementRef: ElementRef;
  @ViewChild('diemTru') diemTru: ElementRef;
  form: FormGroup;
  disciplineAction: PraiseDisciplineTypeModel;
  textDis: string;
  saveF = 'Save Fail';
  model = {
    terms: false,
  };
  loading: boolean;
  noChange = false;
  public dataDiscipline: any = {
    id: '',
    creationTime: '',
    content: '',
    biTruDiemHanhKiem: false,
    minusMarkConduct: null,
    type: 1
  }

  constructor(private notiService: NotiService,
              private praiseDisciplineTypeService: PraiseDisciplineTypeService) {
    this.form = new FormGroup({
      id: new FormControl(this.dataDiscipline.id, []),
      creationTime: new FormControl(this.dataDiscipline.creationTime, []),
      content: new FormControl(this.dataDiscipline.content, [Validators.required, Validators.maxLength(250)]),
      biTruDiemHanhKiem: new FormControl(this.dataDiscipline.biTruDiemHanhKiem, [Validators.pattern('[^~`!@#$%^&*()_=[{}\\]|:;\\\\"\'<+>?/]*')]),
      minusMarkConduct: new FormControl(this.dataDiscipline.minusMarkConduct, [Validators.required, Validators.pattern('^[0-9]*[.]?[0-9]$'),
        Validators.maxLength(4), Validators.max(9999)]),
      type: new FormControl(this.dataDiscipline.type, []),
    })
    if (this.form.value.biTruDiemHanhKiem) {
      this.form.get('minusMarkConduct').enable();
    } else {
      this.form.get('minusMarkConduct').disable();
    }
  }

  ngOnInit(): void {
    if (this.action === 'edit') {
      // this.textDis = 'Cập nhật kỷ luật';
      if(this.data.minusMarkConduct !== null){
        this.dataDiscipline.biTruDiemHanhKiem = true;
      }
      if (this.dataDiscipline.biTruDiemHanhKiem) {
        this.form.get('minusMarkConduct').enable();
      } else {
        this.form.get('minusMarkConduct').disable();
      }
      this.form.patchValue({
        id: this.data.id,
        content: this.data.content,
        biTruDiemHanhKiem: this.dataDiscipline.biTruDiemHanhKiem,
        minusMarkConduct: this.data.minusMarkConduct,
        type: this.dataDiscipline.type
      })
    } else if (this.action === 'create') {
      // this.textDis = 'Thêm mới kỷ luật';
      this.form.patchValue({
        content: '',
        biTruDiemHanhKiem: false,
        minusMarkConduct: '',
        type: this.dataDiscipline.type
      })
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 100)
  }

  actionDis() {
    if (this.action === 'create') {
      // this.loading = true;
      this.disPost.emit(this.form)
    } else if (this.action === 'edit') {
      // this.loading = true;
      this.disPut.emit(this.form);
    }
    if(this.saveF === 'Save Fail' && this.form.value.content === '' ){
      this.elementRef.nativeElement.focus()
    }
  }

  check() {
    this.saveF = 'Check';
    if (!this.form.value.biTruDiemHanhKiem) {
      this.form.get('minusMarkConduct').enable();
      this.diemTru.nativeElement.focus();
    } else this.form.get('minusMarkConduct').disable();
  }

}

import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ExamViolationTypeModel} from '../../../../../core/service/model/exam-violation-type.model';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {locale} from '../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-action-exam-violation-type',
  templateUrl: './action-exam-violation-type.component.html',
  styleUrls: ['./action-exam-violation-type.component.scss']
})
export class ActionExamViolationTypeComponent implements OnInit, AfterViewInit {
  VI_LANG = locale.data

  @Input() action: string;
  @Input() data: any;
  @Output() close = new EventEmitter();
  @Output() examPost = new EventEmitter();
  @Output() examPut = new EventEmitter();
  @Output() errorPer = new EventEmitter();
  @ViewChild('tenLoiViPham') elementRef: ElementRef;
  @ViewChild('diemTru11') mark: ElementRef;
  form: FormGroup;
  examViolationAction: ExamViolationTypeModel;
  textEV: string;
  model = {
    thiSinh: 0,
    giamThi: 1
  }
  loading: boolean;
  checkDiemTru = false;
  noChange = false;
  public dataExam: any = {
    id: '',
    name: '',
    minusMark: null,
    description: '',
    creationTime: '',
    violationExamRegulationUserType: 0,
  }

  constructor(private notiService: NotiService) {
    this.form = new FormGroup({
      id: new FormControl(this.dataExam.id, []),
      name: new FormControl(this.dataExam.name, [Validators.required, Validators.maxLength(250), ]),
      minusMark: new FormControl(this.dataExam.minusMark, [Validators.pattern('[0-9]*'), Validators.maxLength(3), Validators.max(100), Validators.required]),
      description: new FormControl(this.dataExam.description, [Validators.maxLength(250)]),
      creationTime: new FormControl(this.dataExam.creationTime, []),
      violationExamRegulationUserType: new FormControl(this.dataExam.violationExamRegulationUserType, [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.action === 'edit') {
      // this.textEV = 'Sửa lỗi vi phạm quy chế thi';
      this.form.patchValue({
        id: this.data.id,
        name: this.data.name,
        minusMark: this.data.minusMark,
        description: this.data.description,
        violationExamRegulationUserType: this.data.violationExamRegulationUserType,
      })
    } else if (this.action === 'create') {
      // this.textEV = 'Thêm mới lỗi vi phạm quy chế thi'
      this.form.patchValue({
        name: '',
        minusMark: '',
        description: '',
        violationExamRegulationUserType: this.dataExam.violationExamRegulationUserType,
      })
    }
    // this.changeRadio();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 100)
  }

  actionEV() {
    if (this.form.value.violationExamRegulationUserType === 0) {
      this.checkDiemTru = false
      if (this.action === 'create') {
        if(this.form.value.name !== '' && this.form.value.minusMark === ''){
          this.mark.nativeElement.focus();
        }
        // this.loading = true;
        this.examPost.emit(this.form)
      } else if (this.action === 'edit') {
        // this.loading = true;
        this.examPut.emit(this.form);
      }
    } else {
      this.checkDiemTru = false;
      if (this.action === 'create') {
        // this.loading = true;
        this.examPost.emit(this.form)
      } else if (this.action === 'edit') {
        // this.loading = true;
        this.examPut.emit(this.form);
      }
    }
  }
  changeRadio() {
    if (this.form.value.violationExamRegulationUserType === 1) {
      this.form.controls.minusMark.disable();
      this.form.patchValue({
        minusMark: ''
      })
      this.checkDiemTru = false;
      this.elementRef.nativeElement.focus();
    } else this.form.controls.minusMark.enable();
    this.elementRef.nativeElement.focus();
  }
  check() {
    if (this.form.value.violationExamRegulationUserType === 1 || this.form.value.violationExamRegulationUserType === 0) {
      this.elementRef.nativeElement.focus();
    }
  }
  // Validators.pattern('[^~`!@#$%^&*()_=[{}\\]|:;\\\\"\'<+>.?/]*')
}


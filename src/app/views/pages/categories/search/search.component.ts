import { FormBuilder } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GroupFaultCriteriaTypeModel } from '../../../../core/service/model/group-fault-criteria-type.model.';
import { GroupFaultCriteriaTypeService } from '../../../../core/service/service-model/group-fault-criteria-type.service';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import validate = WebAssembly.validate;

// export enum ViolationType {
//   ALL = 'Tất cả',
//   TYPE_1 = 'Loại 1',
//   TYPE_2 = 'Loại 2',
//   TYPE_3 = 'Loại 3',
//   TYPE_4 = 'Loại 4',
// }

@Component({
  selector: 'kt-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('search') elementRef: ElementRef;
  @Input() component;
  @Output() submitSearch = new EventEmitter();
  listGroupFaultCriteria: GroupFaultCriteriaTypeModel[];

  isCollapsed = true;
  search: any;

  // violationType: ViolationType
  // violationTypes: Array<string> = [ViolationType.TYPE_1, ViolationType.TYPE_2, ViolationType.TYPE_3, ViolationType.TYPE_4 ]
  nhomLoiViPhamId: '';
  tenLoiViPham: '';
  rewardValue = '';
  disciplineValue = '';
  expTypeValue = '';
  expWorkValue = '';
  errorExamValue = '';
  nguoiViPham = 0;
  scoreTypeValue = '';
  endingRewardValue = '';
  model = {
    thiSinh: 0,
    giamThi: 1
  }
  _isLength: boolean = false;
  _isPattern: boolean = false;
  // @ViewChild('search') searchPoint: ElementRef;
  form: FormGroup;
  public boolSearch: boolean;
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public groupF = { id: '', creationTime: '', tenNhomLoiViPham: '[Tất cả]', moTa: '' }
  regex: string = "^[a-zA-Z0-9_\\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*[^!@#$%^&*()+';/|+-]$"

  constructor(
    private groupFaultCriteriaTypeService: GroupFaultCriteriaTypeService) {
    this.form = new FormGroup({
      tenExam: new FormControl('', [Validators.maxLength(250)]),
      tenWork: new FormControl('', [Validators.maxLength(250)]),
      tenExp: new FormControl('', [Validators.maxLength(250)]),
      tenRF: new FormControl('', [Validators.maxLength(250)]),
      tenD: new FormControl('', [Validators.maxLength(250)]),
      tenP: new FormControl('', [Validators.maxLength(250)]),
      tenFault: new FormControl('', [Validators.maxLength(250)]),
      tenThiDua: new FormControl('',[Validators.maxLength(250),Validators.pattern(this.regex)])
    })

  }

  ngOnInit(): void {
    // this.loadDataFault();
  }

  submitFault() {
    this.formatFault();
    this.search = {
      // faultId: this.nhomLoiViPhamId,
      nameFault: this.tenLoiViPham.trim(),
    };
    this.submitSearch.emit(this.search);
  }

  submitReward() {
    this.formatP()
    this.search = {
      rewardValue: this.rewardValue.trim()
    };
    this.submitSearch.emit(this.search);
  }

  submitDiscipline() {
    this.formatD()
    this.search = {
      discipline: this.disciplineValue.trim()
    };
    this.submitSearch.emit(this.search);
  }

  submitExpType() {
    this.formatExp()
    this.search = {
      keyWord: this.expTypeValue.trim()
    };
    this.submitSearch.emit(this.search);
  }

  submitExpWork() {
    this.formatWork()
    this.search = {
      expWork: this.expWorkValue.trim()
    };
    this.submitSearch.emit(this.search);
  }

  submitErrorExam() {
    this.formatExam()
    this.search = {
      errorExam: this.errorExamValue.trim(),
      // personExam: this.nguoiViPham,
    };
    this.submitSearch.emit(this.search)
  }

  submitScoreType() {
    this.formatDiemThiDua();
    // if (this.scoreTypeValue === '') {
    //   this.elementRef.nativeElement.focus();
    // } else {
      // this.scoreTypeValue.trim();
      this.search = {
        scoreType: this.scoreTypeValue.trim()
      };
      this.submitSearch.emit(this.search)
    // }
  }

  submitEndingReward() {
    this.formatRF()
    this.boolSearch = true;
    this.isLoading.next(false);
    this.search = {
      endingReward: this.endingRewardValue
    };
    this.submitSearch.emit(this.search)
    this.isLoading.next(true);
    this.boolSearch = false;
  }

  loadDataFault() {
    this.groupFaultCriteriaTypeService.getAllGroupFault().subscribe(value => {
      this.listGroupFaultCriteria = value;
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 100)
  }

  // trim khi click ra ngoài
  formatExam() {
    let note = ''
    if (this.form.value.tenExam) {
      note = this.form.value.tenExam.trim();
      this.form.patchValue({
        tenExam: note
      })
    }
  }

  formatRF() {
    let note = ''
    if (this.form.value.tenRF) {
      note = this.form.value.tenRF.trim();
      this.form.patchValue({
        tenRF: note
      })
    }
  }

  formatWork() {
    let note = ''
    if (this.form.value.tenWork) {
      note = this.form.value.tenWork.trim();
    }
    this.form.patchValue({
      tenWork: note
    })
  }

  formatExp() {
    let note = ''
    if (this.form.value.tenExp) {
      note = this.form.value.tenExp.trim();
    }
    this.form.patchValue({
      tenExp: note
    })
  }
  formatD() {
    let note = ''
    if (this.form.value.tenD) {
      note = this.form.value.tenD.trim();
    }
    this.form.patchValue({
      tenD: note
    })
  }
  formatP() {
    let note = ''
    if (this.form.value.tenP) {
      note = this.form.value.tenP.trim();
    }
    this.form.patchValue({
      tenP: note
    })
  }
  formatFault() {
    let note = ''
    if (this.form.value.tenFault) {
      note = this.form.value.tenFault.trim();
    }
    this.form.patchValue({
      tenFault: note
    })
  }
  formatDiemThiDua(){
    let note=''
    if(this.form.value.tenThiDua){
      note = this.form.value.tenThiDua.trim()
    }
    this.form.patchValue({
      tenThiDua:note
    })
  }
  // checkContent() {
  //   if (this.scoreTypeValue === '') {
  //     this._isLength = false
  //     this._isPattern = false;
  //   } else {
  //     if (this.scoreTypeValue.length > 250) {
  //       this._isLength = true
  //     } else {
  //       this._isLength = false
  //     }
  //     if (this.scoreTypeValue.match(this.regex)) {
  //       this._isPattern = false;
  //     } else {
  //       this._isPattern = true;
  //     }
  //   }
  // }
}

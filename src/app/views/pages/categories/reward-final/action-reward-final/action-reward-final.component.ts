import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {RewardFinalState} from '../../../../../core/service/states/reward-final.state';
import {RewardFinalModel} from '../../../../../core/service/model/reward-final.model';
import {locale} from '../../../../../core/_config/i18n/vi';

@Component({
  selector: 'kt-action-endingreward',
  templateUrl: './action-reward-final.component.html',
  styleUrls: ['./action-reward-final.component.scss']
})
export class ActionRewardFinalComponent implements OnInit, AfterViewInit {
  VI_LANG = locale.data;
  @Input() action: string;
  @Input() turnLoading: string;
  @Input() dataEdit: RewardFinalModel;
  // tslint:disable-next-line:no-output-native
  @Output() close = new EventEmitter();
  @Output() rFPost = new EventEmitter();
  @Output() rFPut = new EventEmitter();
  @ViewChild('hinhThucKhenThuong') elementRef : ElementRef;
  form: FormGroup;
  rewardFinalAction: RewardFinalModel;
  loading : boolean;
  textRF: string;
  noChange = false;
  public dataRF: any = {
    id: '',
    creationTime: '',
    rewardMode: '',
    description: ''
  }

  constructor(private notiService: NotiService) {
    this.form = new FormGroup({
      id: new FormControl(this.dataRF.id, []),
      creationTime: new FormControl(this.dataRF.creationTime, []),
      rewardMode: new FormControl(this.dataRF.rewardMode, [Validators.required, Validators.maxLength(250)]),
      description: new FormControl(this.dataRF.description, [ Validators.maxLength(250)])
    })
  }

  ngOnInit(): void {
    if(this.action === 'edit'){
      // this.textRF = ' Cập nhật khen thưởng cuối kỳ';
      this.form.patchValue({
        id: this.dataEdit.id,
        rewardMode: this.dataEdit.rewardMode,
        description: this.dataEdit.description
      })
    } else if(this.action === 'create') {
      // this.textRF = 'Thêm mới khen thưởng cuối kỳ'
      this.form.patchValue({
        rewardMode: '',
        description: ''
      })
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 100)
  }
  actionRF(){
      if(this.action === 'create'){
        // this.turnLoading = 'open'
        // this.loading= true;
        this.rFPost.emit(this.form)
        // this.loading = false;
      }else if(this.action === 'edit'){
        // this.loading =true;
        this.rFPut.emit(this.form);
        // this.loading = false;
      }
    // }
  }
}

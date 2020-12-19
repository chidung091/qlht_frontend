import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProvinceModel} from '../../../../../../core/service/model/province.model';
import {DistrictModel} from '../../../../../../core/service/model/district.model';
import {WardsModel} from '../../../../../../core/service/model/wards.model';
import {locale} from '../../../../../../core/_config/i18n/vi';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-transfer-work',
  templateUrl: './transfer-work.component.html',
  styleUrls: ['./transfer-work.component.scss']
})
export class TransferWorkComponent implements OnInit {

  active = 1;
  VI_LANG = locale.data;
  province$: Observable<ProvinceModel[]>;
  districts$: Observable<DistrictModel[]>;
  ward$: Observable<WardsModel[]>;
  checkMode: any = 'oneCheck';
  @Input() title: string;

  constructor(
    private modal: NgbModal,
    private ActiveModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    console.log('hanv debug!')
    this.districts$.subscribe(data => {
      console.log('hanv!', data)
    })
  }

  closeModal() {
    this.ActiveModal.dismiss();
  }
}

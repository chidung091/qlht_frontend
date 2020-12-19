import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {locale} from '../../../../../../core/_config/i18n/vi';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DropDownListComponent} from '@progress/kendo-angular-dropdowns';
import {Observable} from 'rxjs';
import {DistrictModel} from '../../../../../../core/service/model/district.model';
import {ProvinceModel} from '../../../../../../core/service/model/province.model';
import {Store} from '@ngxs/store';
import {Store as StoreRx} from '@ngrx/store';
import {SchoolInformationModel} from '../../../../../../core/service/model/school-information.model';
import {ProvinceState} from '../../../../../../core/service/states/province.state';
import {GetAllProvince} from '../../../../../../core/service/actions/province.action';
import {DistrictState} from '../../../../../../core/service/states/district.state';
import {GetDistrictOfProvince} from '../../../../../../core/service/actions/district.action';
import {NotiService} from '../../../../../../core/service/service-model/notification.service';
import {AddData, UpdateData} from '../../../../../../core/service/actions/school-information-action';
import {TenantReLoad} from '../../../../../../core/auth';

@Component({
  selector: 'kt-action-school-place',
  templateUrl: './action.component.html',
})
export class ActionComponent implements OnInit {

  @Input() data: SchoolInformationModel;
  @ViewChild('quanhuyen') districtDropdown: DropDownListComponent;

  title: string;
  isAddNew: boolean;
  VI_LANG = locale.data;
  public defaultItemProvince = {provinceName: 'Lựa chọn', provinceCode: null};
  public defaultItemDistrict = {districtName: 'Lựa chọn', districtCode: null};
  formGroup: FormGroup;
  isDisable: boolean;
  isLoading: boolean;

  listDistrict$: Observable<DistrictModel[]>;
  listDistrict: DistrictModel[];
  listDistrictSearch: DistrictModel[];
  listProvince$: Observable<ProvinceModel[]>;
  listProvince: ProvinceModel[];
  listProvinceSearch: ProvinceModel[];


  constructor(
    public activeModal: NgbActiveModal,
    private store: Store,
    private storeRx: StoreRx,
    private notiService: NotiService,
  ) {
  }

  ngOnInit(): void {
    document.getElementById('maDiemTruong').focus();

    if (typeof this.data === 'undefined') {
      this.data = new SchoolInformationModel();
      this.title = 'Thêm mới điểm trường phụ';
      this.isAddNew = true;
    } else {
      this.title = 'Chỉnh sửa điểm trường phụ';
      this.isAddNew = false;
    }

    this.listProvince$ = this.store.select(ProvinceState.getAllProvince);
    this.listDistrict$ = this.store.select(DistrictState.getList);
    this.listProvince$.subscribe(data => {
      if (!data) {
        this.store.dispatch(new GetAllProvince());
      } else {
        this.listProvince = data;
        this.listProvinceSearch = this.listProvince;
      }
    })

    this.initForm();
    this.patchForm();


  }

  initForm() {
    this.formGroup = new FormGroup({
      tenDiemTruong: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      maDiemTruong: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      diaChi: new FormControl('', [Validators.maxLength(200)]),
      khoangCach: new FormControl('', [Validators.maxLength(50), Validators.pattern('[0-9]*')]),
      soDienThoai: new FormControl('', [Validators.maxLength(50), Validators.pattern('[0-9]*')]),
      mota: new FormControl('', [Validators.maxLength(200)]),
      dienTich: new FormControl('', [Validators.maxLength(50), Validators.pattern('[0-9]*')]),
      maTinh: new FormControl(null, [Validators.required]),
      maHuyen: new FormControl(null, Validators.required),
    });
  }

  patchForm() {
    this.formGroup.patchValue({
      id: this.data.id,
      maDiemTruong: this.data.schoolPlaceCode,
      tenDiemTruong: this.data.schoolPlaceName,
      diaChi: this.data.address,
      khoangCach: this.data.distance,
      soDienThoai: this.data.phoneNumber,
      dienTich: this.data.acreage,
      mota: this.data.description,
      maTinh: this.data.provinceCode,
      maHuyen: this.data.districtCode,
    })

    if (this.data.provinceCode) {
      this.store.dispatch(new GetDistrictOfProvince(this.formGroup.value.maTinh));
      this.listDistrict$.subscribe(data => {
        this.listDistrict = data;
        this.listDistrictSearch = this.listDistrict;
      })
    }
  }

  addValue() {
    this.data = JSON.parse(JSON.stringify(this.data));
    this.data.acreage = this.formGroup.getRawValue()?.dienTich;
    this.data.address = this.formGroup.getRawValue()?.diaChi;
    this.data.description = this.formGroup.getRawValue()?.mota;
    this.data.distance = this.formGroup.getRawValue()?.khoangCach;
    this.data.districtCode = this.formGroup.getRawValue()?.maHuyen;
    this.data.provinceCode = this.formGroup.getRawValue()?.maTinh;
    this.data.phoneNumber = this.formGroup.getRawValue()?.soDienThoai;
    this.data.schoolPlaceCode = this.formGroup.getRawValue()?.maDiemTruong;
    this.data.schoolPlaceName = this.formGroup.getRawValue()?.tenDiemTruong;
  }

  submit() {
    this.addValue();
    if (this.formGroup.invalid) {
      this.notiService.fillFullInfoWarning();
    } else {
      this.isLoading = true;
      if (this.isAddNew) {
        this.store.dispatch(new AddData(this.data)).subscribe(value => {
          this.notiService.createSuccess();
          this.storeRx.dispatch(new TenantReLoad());
          this.activeModal.close();
          this.isLoading = false;
        }, () => this.isLoading = false)
      } else {
        this.store.dispatch(new UpdateData(this.data.id, this.data)).subscribe(() => {
          this.notiService.updateSuccess();
          this.storeRx.dispatch(new TenantReLoad());
          this.activeModal.close();
          this.isLoading = false;
        }, () => this.isLoading = false)
      }
    }
  }

  trimSpace(formName: string) {
    if (formName) {
      this.formGroup.get(formName).setValue(
        this.formGroup.get(formName).value?.trim().replace(/(\s\s+| )/g, ' ')
      )
    }
  }

  changeProvince() {
    this.districtDropdown.reset();
    this.formGroup.value.maHuyen = null;
    if (this.formGroup.value.maTinh) {
      this.store.dispatch(new GetDistrictOfProvince(this.formGroup.value.maTinh));
      this.listDistrict$.subscribe(data => {
        this.listDistrict = data;
        this.listDistrictSearch = this.listDistrict;
      })
    }
  }

  handleFilter(value, type) {
    switch (type) {
      case 'maTinh':
        this.listProvinceSearch = this.listProvince.filter((s) => s.provinceName.toLowerCase().indexOf(value.toLowerCase()) !== -1)
        break;
      case 'maHuyen':
        this.listDistrictSearch = this.listDistrict.filter((s) => s.districtName.toLowerCase().indexOf(value.toLowerCase()) !== -1)
        break;
    }
  }


}

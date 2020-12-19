import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ExtraTenant} from 'src/app/core/auth/_models';
import {AppState} from '../../../../../core/reducers';
import {select, Store} from '@ngrx/store';
import {extraProperty} from '../../../../../core/auth/_selectors/tenant.selectors';
import {CatalogService} from '../../../../../core/service/service-model/catalog.service';
import {
  ListSchoolAttributeModel,
  SchoolAttributeBindingModel,
  SchoolAttributeChildModel,
  SchoolAttributeModel
} from '../../../../../core/service/model/school-attribute.model';

@Component({
  selector: 'kt-other-school-information',
  templateUrl: './other-school-information.component.html',
  styleUrls: ['./other-school-information.component.scss'],
})
export class OtherSchoolInformationComponent implements OnInit {

  @Input() extraInfo: ListSchoolAttributeModel;

  @Output() otherInfoOutput = new EventEmitter();

  // extraProperty
  extraProperty$: Observable<ExtraTenant>;
  extraProperty: ExtraTenant;

  listSchoolBinding: SchoolAttributeBindingModel[];
  listSelect: string[] = [];

  listDropdowns: SchoolAttributeChildModel[];
  listSelectDropdown: SchoolAttributeModel[] = [];

  defaultDropdown: SchoolAttributeBindingModel = {cateCode: null, cateName: 'Lựa chọn'}

  disableDropdown: boolean[] = [];

  public listCheckBox: ListSchoolAttributeModel;

  constructor(private store: Store<AppState>,
              private cdr: ChangeDetectorRef,
              private catalogService: CatalogService) {
    // this.tenantRx$ = storeRx.select('tenant');

    // Lấy thông tin khác trong API thông tin trường
    this.extraProperty$ = this.store.pipe(select(extraProperty));
    this.extraProperty$.subscribe(value => {
      if (value) this.extraProperty = value;
      if (value.extras) this.listSelect = value.extras;
    })
    // -----------------


  }

  ngOnInit(): void {
    // Gán giá trị từ danh sách thuộc tính vào biến để binding ra client.
    // Tuy nhiên nếu giữ nguyên dữ liệu gốc thì sẽ không chỉnh sửa được -> parse ra json
    this.listSchoolBinding = JSON.parse(JSON.stringify(this.extraInfo.listProperty.map(item => {
      // check xem dữ liệu từ thông tin trường với danh sách mặc định, nếu trùng thì gán status = true.
      if (this.extraProperty?.extras?.includes(item.cateCode)) {
        return new SchoolAttributeBindingModel(item.cateCode, item.cateName, true);
      } else return new SchoolAttributeBindingModel(item.cateCode, item.cateName, false);
    })))

    // Gán dữ liệu vào dropdown list.
    this.listDropdowns = this.extraInfo.listOtherProperty;

    const listParentDropdown = this.listDropdowns.map(item => item.categoryPropertyTenantKey);
    const listIdParent = listParentDropdown.map(item => item.cateCode);

    listIdParent.forEach((item, index) => {
      this.listDropdowns.forEach(() => {
        this.listSelectDropdown.push(null);
      })
      if (this.listSelect.includes(item)){
        const listChildren = this.listDropdowns
          .filter(child => child.categoryPropertyTenantKey.cateCode === item)
          .map(temp => temp.listCategory);
        listChildren.find(children => {
          children.find(item2 => {
            if (this.listSelect.includes(item2.cateCode)) {
              if (this.listSelectDropdown.length === 0) {
                this.listSelectDropdown.push(item2)
              } else {
                this.listSelectDropdown[index] = item2;
              }
            }
          })
        })
      }
    })

    // check xem nếu status vùng khó khăn === true -> enable dropdown list
    this.updateDisableDropdown();

    this.cdr.detectChanges();
  }

  change(value) {
    // Sau mỗi lần ấn checkbox -> gán mã danh mục vào mảng string
    if (value.status) {
      this.listSelect = JSON.parse(JSON.stringify(this.listSelect));
      this.listSelect.push(value.cateCode)
    } else {
      this.listSelect = this.listSelect.filter(item => item !== value.cateCode)
      if (this.listDropdowns.map(item => item.categoryPropertyTenantKey).map(b => b.cateCode).includes(value.cateCode)) {
        const abc = this.listDropdowns.find(o => o.categoryPropertyTenantKey.cateCode === value.cateCode);
        const def = abc.listCategory.map(m => m.cateCode);
        this.listSelect = this.listSelect.filter(item => !def.includes(item));
      }
    }
    // check disable dropdown
    this.updateDisableDropdown()
    // output dữ liệu qua component chính
    this.otherInfoOutput.emit(this.listSelect);
  }

  updateDisableDropdown() {
    // lấy mã danh mục cha trong dropdown, check nếu mà mã danh mục cha status === true -> enable dropdown
    const listParentDropdown = this.listDropdowns.map(item => item.categoryPropertyTenantKey);
    const listIdParent = listParentDropdown.map(item => item.cateCode);

    listIdParent.forEach((item, index) => {
      if (this.disableDropdown.length === 0) {
        this.disableDropdown.push(!this.listSelect.includes(item))
      } else {
        this.disableDropdown[index] = !this.listSelect.includes(item)
      }
    })
  }

  changeDropDown(value: any, parentCateCode: string) {
    // Xoá tất cả mã danh mục trong dropdown trong list đã chọn
    this.listSelect = this.listSelect.filter(item => {
      const tempDropdown = this.listDropdowns.find(temp => temp.categoryPropertyTenantKey.cateCode === parentCateCode).listCategory;
      if (!tempDropdown.map(temp => temp.cateCode).includes(item)) {
        return item;
      }
    })

    // gán mã danh mục chọn trong dropdown vào trong list đã chọn. Vì có trường hợp mặc định nên phải check null
    if (value.cateCode) {
      this.listSelect.push(value.cateCode)
    }

    this.otherInfoOutput.emit(this.listSelect);
  }
}

import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {NotiService} from '../../../../core/service/service-model/notification.service';
import {Router} from '@angular/router';
import {TenantInfo, TenantUpdate} from '../../../../core/auth';
import {select, Store as StoreRx} from '@ngrx/store';
import {TenantState} from '../../../../core/auth/_reducers/tenant.reducers';
import {SmasContextService} from '../../../../core/_base/layout';
import {ExtraTenant, SchoolPlaces} from '../../../../core/auth/_models';
import {CatalogService} from '../../../../core/service/service-model/catalog.service';
import {ListSchoolAttributeModel} from '../../../../core/service/model/school-attribute.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {extraProperty, getFullSchoolPlace, tenantState} from '../../../../core/auth/_selectors/tenant.selectors';
import {AppState} from '../../../../core/reducers';
import {locale} from '../../../../core/_config/i18n/vi';


@Component({
  selector: 'kt-school-information',
  templateUrl: './school-information.component.html',
  styleUrls: ['./school-information.component.scss']
})
export class SchoolInformationComponent implements OnInit {

  VI_LANG = locale.data;

  @Input() initInfo: boolean;
  @Output() initNext = new EventEmitter();
  isLoading$: boolean;
  extraProperty$: Observable<ExtraTenant>;
  extraProperty: ExtraTenant;
  isUpdateOtherInfo: boolean;

  tenant: TenantInfo;
  tenantStateRx$: Observable<TenantState>;
  dataExtra: string[];

  objDataGeneral: {
    tenant: TenantInfo,
    isInvalid: boolean,
    save: boolean,
  }

  schoolPlaces$: Observable<SchoolPlaces[]>
  schoolPlaces: SchoolPlaces[]

  collapser = false;

  extraInfo: ListSchoolAttributeModel;

  constructor(
    private notiService: NotiService,
    private cdr: ChangeDetectorRef,
    private catalogService: CatalogService,
    private store: Store,
    private notificationService: NotiService, private smasContextService: SmasContextService,
    private router: Router, private modalService: NgbModal,
    private storeRx: StoreRx<AppState>
  ) {
    this.tenantStateRx$ = this.storeRx.pipe(select(tenantState));
    this.extraProperty$ = this.storeRx.pipe(select(extraProperty));
    this.extraProperty$.subscribe(value => {
      if (value) this.extraProperty = value;
    })
    this.schoolPlaces$ = this.storeRx.pipe(select(getFullSchoolPlace));
    this.schoolPlaces$.subscribe(value => {
      this.schoolPlaces = value;
    })
  }

  ngOnInit(): void {
    this.getExtraData();
    this.isUpdateOtherInfo = false;
  }


  getDataGeneral(event) {
    this.objDataGeneral = event;
    this.tenant = JSON.parse(JSON.stringify(this.objDataGeneral.tenant));
    if (this.objDataGeneral.save) {
      if (this.objDataGeneral.isInvalid) {
        this.notiService.fillFullInfoWarning();
      } else {
        this.save();
      }
    }
  }

  save() {
    this.isLoading$ = true;
    this.cdr.detectChanges();

    if (!this.tenant.extraProperties) {
      this.tenant.extraProperties = new ExtraTenant();
    }
    if (this.isUpdateOtherInfo) {
      this.tenant.extraProperties.extras = this.dataExtra;
    } else {
      this.tenant.extraProperties.extras = this.extraProperty.extras;
    }

    this.tenant.schoolPlaces = this.schoolPlaces;
    const newSchoolLevel = []
    this.tenant.schoolLevels.forEach(item => {
      if (!item.maCapHoc) {
        const newItem = {
          schoolLevelCode: item.schoolLevelCode,
          schoolLevelName: item.schoolLevelName
        }
        newSchoolLevel.push(newItem);
      } else {
        newSchoolLevel.push(item);
      }
    });
    this.tenant.schoolLevels = newSchoolLevel
    this.storeRx.dispatch(new TenantUpdate(this.tenant.id, this.tenant))
    this.tenantStateRx$.subscribe((result) => {
      this.isLoading$ = result.isLoading;
      this.cdr.detectChanges();
      if (result.isUpdated && this.initInfo) this.initNext.emit();
    })
  }

  getDataOther(event) {
    this.isUpdateOtherInfo = true;
    this.dataExtra = event
  }


  getExtraData() {
    this.catalogService.getSchoolAttribute().subscribe(value => {
      if (value) {
        this.extraInfo = value;
      }
    })
  }
}

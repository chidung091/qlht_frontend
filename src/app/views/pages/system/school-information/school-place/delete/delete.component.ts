import {Component, Input, OnInit} from '@angular/core';
import {locale} from '../../../../../../core/_config/i18n/vi';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteMultiple} from '../../../../../../core/service/actions/school-information-action';
import {Store} from '@ngxs/store';
import {TenantReLoad} from '../../../../../../core/auth';
import {select, Store as StoreRx} from '@ngrx/store';
import {AppState} from '../../../../../../core/reducers';
import {NotiService} from '../../../../../../core/service/service-model/notification.service';

@Component({
  selector: 'kt-delete-school-place',
  templateUrl: './delete.component.html',
})
export class DeleteComponent implements OnInit {
  VI_LANG = locale.data;
  isLoading: boolean;

  @Input() data: string[] ;

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store,
    private storeRx: StoreRx<AppState>,
    private notiService: NotiService,
  ) {
  }

  ngOnInit(): void {
    document.getElementById('btn-delete').focus();
  }

  submitDelete(){
    this.isLoading = true;
    this.store.dispatch(new DeleteMultiple(this.data)).subscribe(() => {
      this.storeRx.dispatch(new TenantReLoad());
      this.notiService.deleteSuccess();
      this.activeModal.close();
      this.isLoading = false;
    }, () => {
      this.isLoading = false
    }, () => {

    })
  }

}

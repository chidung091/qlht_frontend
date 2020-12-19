import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NotiService } from 'src/app/core/service/service-model/notification.service';
import { UserService } from '../../../service-management/user.service';

@Component({
  selector: 'kt-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {

  @Input() selectedItem: any;
  isloading = false;
  //isActive:boolean;;

  constructor(
    public _NgbActiveModal: NgbActiveModal,
    private api: UserService,
    private notiService: NotiService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  get activeModal() {
    return this._NgbActiveModal;
  }


  public cancel() {
    this.activeModal.dismiss();
  }

  save() {
    this.isloading = true;
   
    //this.isActive= !this.selectedItem.isActive;
    this.api.ResetPassword(this.selectedItem.id).subscribe(res=>{
      
      this.isloading = false;
      
      this.activeModal.close('reset');
      this.toastr.success('Đã thay đổi mật khẩu thành công');
      this.notiService.showNoti;
    }, error=>{
      this.isloading = false;
      this.toastr.error(error.error.error.message)
      this.notiService.showNoti;
    }
    
    )
    
  }

}

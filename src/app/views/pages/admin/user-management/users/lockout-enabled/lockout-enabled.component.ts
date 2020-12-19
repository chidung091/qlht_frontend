import { UserItem } from './../../../model/identity';
import { Status } from './../../../../system/search/search.component';
import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotiService } from 'src/app/core/service/service-model/notification.service';
import { RoleBase } from '../../../model/identity';
import { UserService } from '../../../service-management/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'kt-lockout-enabled',
  templateUrl: './lockout-enabled.component.html',
  styleUrls: ['./lockout-enabled.component.scss']
})
export class LockoutEnabledComponent implements OnInit {

 
  @Input() selectedItem: any;
  isloading = false;
  isActive:boolean;;

  //lockoutEnabled: boolean;

  constructor(
    public _NgbActiveModal: NgbActiveModal,
    private api: UserService,
    private notiService: NotiService,
    public toastr: ToastrService,
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
   
    this.isActive= !this.selectedItem.isActive;
    this.api.updateLockoutEnabled(this.selectedItem.id, this.isActive).subscribe(res=>{
      
      this.isloading = false;
      
      this.activeModal.close('lock');
      
      if(this.isActive){
        this.toastr.success('Mở khoá tài khoản thành công');
      }else {
      this.toastr.success('Khoá tài khoản thành công');
      }
      this.notiService.showNoti;
    }, error=>{
      this.isloading = false;
      //this.toastr.error(error.error.error.message)
      this.notiService.showNoti;
    }
    
    )
    
  }
  

}

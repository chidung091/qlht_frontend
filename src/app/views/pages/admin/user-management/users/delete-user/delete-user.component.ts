import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotiService } from 'src/app/core/service/service-model/notification.service';
import { UserService } from '../../../service-management/user.service';

@Component({
  selector: 'kt-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  @Input() title: any;
  @Input() selectedItem: any;
  listIds: string[] = [];
  isDisabled: boolean = false;
  loading: boolean = false;

  constructor(
    public _NgbActiveModal: NgbActiveModal,
    private notiService: NotiService,
    private api: UserService
  ) { }

  close(){
    this._NgbActiveModal.close()
  }


  ngOnInit(): void {
  }

  onSubmit(){
    // if(this.listIds.length == 0){
    //   this._NgbActiveModal.close();
    //   this.notiService.showNoti('Hãy chọn người dùng để xóa', 'warning');
    //   return
    // }

    // this.loading = true;
    // this.api.deleteUser(this.listIds[0]).subscribe(() => {
    //   this.notiService.showNoti('Xóa thành công', 'success');
    //   this._NgbActiveModal.close('ok');
    //   this.loading = false;
    // },error => {
    //   this.loading = false;
    // })
    this.loading = true;
    this.isDisabled = true;
    this.api.deleteUser(this.selectedItem.id).subscribe(res =>{
      this._NgbActiveModal.close('ok');
      this.loading = false;
      this.isDisabled = false;
    },()=>{
      this.loading = false;
      this.isDisabled = false;
    })
  }

}

import { error } from '@angular/compiler-cli/src/transformers/util';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/_services/auth.service';
import { NotiService } from 'src/app/core/service/service-model/notification.service';
import { MustMatch } from 'src/app/core/_helpers/must-match.validator';

@Component({
  selector: 'kt-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public form: FormGroup;
  isloading = false;
  constructor(private formBuilder: FormBuilder,
    private notiService: NotiService,
    private authService : AuthService,
    private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        currentPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
         {
          validator: MustMatch('newPassword', 'confirmPassword')
      });
    }
    get f() { return this.form.controls; }

    clickSave(){
      if (this.form.invalid) {
        this.notiService.showNoti('Yêu cầu không hợp lệ', 'error');
      }else{

      const changePass = {
        currentPassword: this.form.value.currentPassword,
        newPassword: this.form.value.newPassword,
      };
      this.isloading=true;
      this.authService.changePassword(changePass.currentPassword,changePass.newPassword).subscribe(res=>{
        this.notiService.showNoti('Cập nhật thành công', 'success');
        this.isloading = false;
        this.cdr.detectChanges();
        this.form.reset();
      }
      , error => {
        this.isloading = false;
        // this.notiService.showNoti(error.error.error.message, 'error');
        this.cdr.detectChanges();
      });

     }

  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MustMatch } from 'src/app/core/_helpers/must-match.validator';
import { UserSaveRequest } from '../../../model/identity';
import { UserService } from '../../../service-management/user.service';

@Component({
  selector: 'kt-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  @Input() title: any;
  @Input() selectedItem: any;
  userForm: FormGroup;
  submitted = false;
  isloading = false;

  constructor(
    public _NgbActiveModal: NgbActiveModal,
    private fb: FormBuilder,
    private api: UserService
  ) { }

  ngOnInit(): void {
    if (this.selectedItem === undefined) {
      this.userForm = this.fb.group(
        {
          userName: new FormControl('', [Validators.required]),
          password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            // Validators.pattern('^(?=.{8})(?=.*[^a-zA-Z])'),
          ]),
          confirmPassword: new FormControl('', [Validators.required]),
          email: new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ]),
          phoneNumber: new FormControl('', [
            Validators.required,
            Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'),
          ]),
        },
        {
          validator: MustMatch('password', 'confirmPassword'),
        }
      );
    } else {
      this.userForm = this.fb.group(
        {
          userName: new FormControl(this.selectedItem.userName, [Validators.required]),
          email: new FormControl(this.selectedItem.email, [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ]),
          phoneNumber: new FormControl(this.selectedItem.phoneNumber, [
            Validators.required,
            Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'),
          ]),
          concurrencyStamp: new FormControl(''),
        }
      );
    }
  }

  trimSpace(formName: string) {
    if (formName) {
      this.userForm.get(formName).setValue(
        this.userForm.get(formName).value?.trim().replace(/(\s\s+| )/g, ' ')
      )
    }
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  public cancel() {
    this.activeModal.close();
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    if (this.selectedItem === undefined) {
      this.isloading = true;
      const body: UserSaveRequest = {
        password: this.userForm.get('password').value,
        userName: this.userForm.get('userName').value,
        email: this.userForm.get('email').value,
        phoneNumber: this.userForm.get('phoneNumber').value,
        roleNames: [],
        fullName: this.userForm.get('userName').value
      }
      this.api.createUser(body).subscribe(res => {
        this.isloading = false;
        this.activeModal.close('ok');
      }, () => {
        this.isloading = false;
      });
    } else {
      this.isloading = true;
      const userPut = {
        id: this.selectedItem.id,
        userName: this.userForm.get('userName').value,
        password: '',
        email: this.userForm.get('email').value,
        phoneNumber: this.userForm.get('phoneNumber').value,
        concurrencyStamp: this.userForm.get('concurrencyStamp').value,
      };
      this.api.updateUser(userPut).subscribe(res => {
        this.isloading = false;
        this.activeModal.close('ok');
      })
    }

  }

  ngOnDestroy(): void {
    this.isloading = false;
  }
}

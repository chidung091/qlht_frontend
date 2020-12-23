import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BehaviorSubject} from "rxjs";
import {EmployeeService} from "../../_services/employee.service";
import {NotiService} from "../../core/service/service-model/notification.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'kt-modal-add-eit-employee',
  templateUrl: './modal-add-eit-employee.component.html',
  styleUrls: ['./modal-add-eit-employee.component.scss']
})
export class ModalAddEitEmployeeComponent implements OnInit {
  form: FormGroup
  submitted = false;
  @Input() selectedItem: any;
  @Input() title: any;
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private _NgbActiveModal: NgbActiveModal,
              private fb: FormBuilder,
              private employeeService: EmployeeService,
              private notiService: NotiService,) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required,Validators.maxLength(55)]),
      password: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required,Validators.maxLength(250)]),
      ngaysinh: new FormControl(null, [Validators.required,Validators.maxLength(250)]),
      sodienthoai: new FormControl('', [Validators.required,Validators.maxLength(250)]),
      salary: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      quequan: new FormControl('', [Validators.maxLength(255)]),
    })
    if (this.selectedItem){
      this.form.controls.email.disable();
      this.form.controls.password.disable();
      this.form.get('email').setValue(this.selectedItem.email);
      this.form.get('password').setValue(this.selectedItem.password);
      this.form.get('fullName').setValue(this.selectedItem.fullName);
      this.form.get('ngaysinh').setValue(this.selectedItem.ngaysinh ? new Date(this.selectedItem.ngaysinh) : null);
      this.form.get('sodienthoai').setValue(this.selectedItem.sodienthoai);
      this.form.get('salary').setValue(this.selectedItem.salary);
      this.form.get('quequan').setValue(this.selectedItem.quequan);
    }
  }
  trimSpace(formName: string) {
    if (formName) {
      this.form.get(formName).setValue(
        this.form.get(formName).value?.trim().replace(/(\s\s+| )/g, ' ')
      )
    }
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  get f() {
    return this.form.controls;
  }
  public cancel() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.selectedItem)
    if (this.selectedItem) {
      const put = {
        email: this.form.get('email').value,
        password: this.form.get('password').value,
        fullName: this.form.get('fullName').value,
        ngaysinh: this.form.get('ngaysinh').value? formatDate(this.form.value.ngaysinh, 'yyyy-MM-dd', 'en') : '',
        sodienthoai: this.form.get('sodienthoai').value,
        salary: this.form.get('salary').value,
        quequan: this.form.get('quequan').value,
      }
      this.loading.next(true);
      this.employeeService.updateEmployee(put, this.selectedItem._id).subscribe(() => {
          this.activeModal.close('update');
          this.notiService.updateSuccess();
          this.loading.next(false);
        }, error => {
          this.loading.next(false);
        }
      )
    } else {
      this.loading.next(true);
      this.employeeService.createEmployee(this.form.value).subscribe(() => {
        this.activeModal.close('create');
        this.notiService.createSuccess();
        this.loading.next(false);
      }, error => (
        this.loading.next(false)))
    }
  }
}

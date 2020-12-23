import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BehaviorSubject} from "rxjs";
import {MedicineService} from "../../_services/medicine.service";
import {NotiService} from "../../core/service/service-model/notification.service";

@Component({
  selector: 'kt-modal-add-eit-medicine',
  templateUrl: './modal-add-eit-medicine.component.html',
  styleUrls: ['./modal-add-eit-medicine.component.scss']
})
export class ModalAddEitMedicineComponent implements OnInit {
  form: FormGroup
  submitted = false;
  @Input() selectedItem: any;
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private _NgbActiveModal: NgbActiveModal,
              private fb: FormBuilder,
              private medicineService: MedicineService,
              private notiService: NotiService,) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      tenthuoc: new FormControl('', [Validators.required,Validators.required]),
      mota: new FormControl('', [Validators.required]),
      giathuocnhap: new FormControl('', [Validators.required,Validators.maxLength(250)]),
      giathuocban: new FormControl('', [Validators.required,Validators.maxLength(250)]),
      donvinhap: new FormControl('', [Validators.required,Validators.maxLength(250)]),
      nhasanxuat: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      soluong: new FormControl('', [Validators.maxLength(250)]),
      danhmuc: new FormControl('', [Validators.maxLength(250)]),
    })
    if (this.selectedItem){
      this.form.get('tenthuoc').setValue(this.selectedItem.tenthuoc);
      this.form.get('mota').setValue(this.selectedItem.mota);
      this.form.get('giathuocnhap').setValue(this.selectedItem.giathuocnhap);
      this.form.get('giathuocban').setValue(this.selectedItem.giathuocban);
      this.form.get('donvinhap').setValue(this.selectedItem.donvinhap);
      this.form.get('nhasanxuat').setValue(this.selectedItem.nhasanxuat);
      this.form.get('soluong').setValue(this.selectedItem.soluong);
      this.form.get('danhmuc').setValue(this.selectedItem.danhmuc);
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
    // this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    console.log(this.selectedItem)
    if (this.selectedItem) {
      const put = {
        tenthuoc: this.form.get('tenthuoc').value,
        mota: this.form.get('mota').value,
        giathuocnhap: this.form.get('giathuocnhap').value,
        giathuocban: this.form.get('giathuocban').value,
        donvinhap: this.form.get('donvinhap').value,
        nhasanxuat: this.form.get('nhasanxuat').value,
        soluong: this.form.get('soluong').value,
        danhmuc:this.form.get('danhmuc').value,
      }
      this.loading.next(true);
      this.medicineService.updateMedicine(put, this.selectedItem._id).subscribe(() => {
          this.activeModal.close('update');
          this.notiService.updateSuccess();
          this.loading.next(false);
        }, error => {
          this.loading.next(false);
        }
      )
    } else {
      this.loading.next(true);
      this.medicineService.createMedicine(this.form.value).subscribe(() => {
        this.activeModal.close('create');
        this.notiService.createSuccess();
        this.loading.next(false);
      }, error => (
        this.loading.next(false)))
    }
  }

  search() {

  }
}

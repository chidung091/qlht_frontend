import { Component, OnInit } from '@angular/core';
import {BillService} from '../../_services/bill.service';
import {CategoryFault, FaultInfo, SanPham} from "../../_models/bill";
import {MedicineService} from "../../_services/medicine.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NotiService} from '../../core/service/service-model/notification.service';

@Component({
  selector: 'kt-modal-add-bill',
  templateUrl: './modal-add-bill.component.html',
  styleUrls: ['./modal-add-bill.component.scss']
})
export class ModalAddBillComponent implements OnInit {
  dateCreate: Date;
  medicine: any;
  public _pageSize = 100;
  public skip = 0;
  array = [];
  selectedItemsList = [];
  checkedIDs = [];
  public faultCategory = {
    faultInfos: [],
    success: true,
    message:'',
  } as CategoryFault;
  constructor(private billService: BillService,
              private medicineService: MedicineService,
              private _NgbActiveModal: NgbActiveModal,
              private notiService: NotiService,) { }

  ngOnInit(): void {
    this.loadData()
  }
  get activeModal() {
    return this._NgbActiveModal;
  }

  public cancel() {
    this.activeModal.dismiss();
  }
  onSubmit(){
    const body = {
      loaihd: "xuat",
      sanpham:this.array,
      idnv: "5fe0cc3dcc3ee539d454f3ac",
      thoigianhd: "2020-11-29"
      // dateFault: this.dateFault ? formatDate(this.dateFault, 'yyyy-MM-dd', 'en') : '',
    }
    this.billService.create(body).subscribe(data =>{
      this.activeModal.close('create');
      this.notiService.updateSuccess();
      console.log(data)
    })
  }
  loadData() {
    const body = {
      skipCount: this.skip,
      pageSize : this._pageSize
    }
    this.medicineService.getMedicine(body).subscribe((data) => {
      this.medicine = data.Medicine;
    });
  }


  getStudentInfor(data,i) {
    console.log(data)

    this.array.push(data)
    console.log('array',this.array)
    // this.medicine.forEach(x =>{
    //   const item = {
    //     tenthuoc: x.tenthuoc,
    //     donvinhap: x.donvinhap,
    //     giathuocban: x.giathuocban,
    //     soluong: x.soluong,
    //     tongtiensp: x.tongtiensp
    //   } as SanPham
    //   this.medicine.push(item)
    //   console.log(item)
    //   console.log(this.medicine)
    // })
  }

  changeSL() {

  }
}

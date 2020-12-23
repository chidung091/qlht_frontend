import { Component, OnInit } from '@angular/core';
import {BillService} from '../../_services/bill.service';
import {Medicine} from "../../_models/medicine";
import {CategoryFault, FaultInfo} from "../../_models/bill";

@Component({
  selector: 'kt-modal-add-bill',
  templateUrl: './modal-add-bill.component.html',
  styleUrls: ['./modal-add-bill.component.scss']
})
export class ModalAddBillComponent implements OnInit {
  dateCreate: Date;

  public faultCategory = {
    faultInfos: [],
    success: true,
    message:'',
  } as CategoryFault;
  constructor(private billService: BillService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.billService.getAllMedicine().subscribe(data => {
      this.faultCategory.faultInfos = [];
      data.studentFaultInfos.forEach(x => {
        const item = {
          _id: x._id,
          tenthuoc: x.tenthuoc,
          mota: x.mota,
          giathuocnhap: x.giathuocban,
          donvinhap: x.donvinhap,
          nhasanxuat: x.nhasanxuat,
          soluong: x.soluong,
          danhmuc: x.danhmuc
        } as FaultInfo;
        this.faultCategory.faultInfos.push(item);
      });
      console.log(data)
    });
  }
}

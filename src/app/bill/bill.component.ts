import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {BillService} from "../_services/bill.service";
import {ModalDeleteEmployeeComponent} from "../employee/modal-delete-employee/modal-delete-employee.component";
import {DetailProductComponent} from "./detail-product/detail-product.component";
import {ModalAddEitEmployeeComponent} from "../employee/modal-add-eit-employee/modal-add-eit-employee.component";
import {ModalAddEitMedicineComponent} from "../medicine/modal-add-eit-medicine/modal-add-eit-medicine.component";
import {ModalAddBillComponent} from "./modal-add-bill/modal-add-bill.component";

@Component({
  selector: 'kt-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  isCollapsed = false;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dataBill: GridDataResult;

  // phan trang
  pageSizes: Array<number> = [5, 10, 20];
  public _pageSize = 5;
  public skip = 0;
  public buttonCount = 5;
  constructor(private modal: NgbModal,
              private fb: FormBuilder,
              private billService: BillService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    const body = {
      skipCount: this.skip,
      pageSize : this._pageSize
    }
    // console.log(this.inforFind)
    // this.inforFind.skipCount = this.skip;
    // this.inforFind.pageSize = this.pageSize;
    this.loading.next(true);
    this.billService.getBill(body).subscribe((data) => {
      console.log(data)
      this.dataBill = ({
        data : data.Billinfo,
        total: data.Totalpages
      })
      console.log(data)
      console.log(data.Userinfor)
      this.isLoading$.next(true);
      this.loading.next(false);
    }, error => {
      this.loading.next(false);
    });
  }

  search() {

  }

  openModalAdd() {
    const modalRef = this.modal.open(ModalAddBillComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.title = 'Thêm mới hóa đơn'
    modalRef.result.then(result => {
      if (result === 'create') {
        this.loadData();
      }
    }).catch(error => error)
  }
  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadData()
  }
  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadData()
  }

  openModalEdit(dataItem: any) {

  }

  openModalDelete($event: MouseEvent, dataItem: any) {
    const modalRef = this.modal.open(DetailProductComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.selectedItem = dataItem;
    console.log(dataItem)
    modalRef.result.then(result => {
      if (result === 'delete') {
        this.loadData();
      }
    }).catch(error => error)
  }
}

import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {BillService} from "../_services/bill.service";

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
        data : data.Userinfo,
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

  }
}

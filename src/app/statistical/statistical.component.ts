import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BillService} from "../_services/bill.service";
import {BehaviorSubject} from "rxjs";
import {GridDataResult} from "@progress/kendo-angular-grid";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'kt-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss']
})
export class StatisticalComponent implements OnInit {
  isCollapsed: boolean = false;
  form: FormGroup;
  public buttonCount = 5;
  pageSizes: Array<number> = [5, 10, 20];
  public previousNext = true;
  public _pageSize = 5;
  public skip = 0;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dataKT:any;
  filter: Date = new Date();
  doanhThu: any;
  constructor(private fb: FormBuilder,
              private billService: BillService,
              public datepipe: DatePipe) { }

  ngOnInit(): void {

  }

  search() {
    const body = {
      thang: this.filter.getMonth(),
      nam : this.filter.getFullYear(),
    }
    this.billService.thongKeDoanhSo(body).subscribe(datas =>{
      this.doanhThu = datas.Doanhthu;
    })
    this.loading.next(true);
    this.billService.thongKeSanPhamCuaDoanhSo(body).subscribe((data) => {
      this.dataKT = data.Doanhthu;
      this.isLoading$.next(true);
      this.loading.next(false);
    }, error => {
      this.loading.next(false);
    });
  }
}

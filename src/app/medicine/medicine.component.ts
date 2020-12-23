import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {MedicineService} from '../_services/medicine.service';
import {GridDataResult, PageChangeEvent} from "@progress/kendo-angular-grid";
import {ModalAddEitMedicineComponent} from "./modal-add-eit-medicine/modal-add-eit-medicine.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalDeleteMedicineComponent} from "./modal-delete-medicine/modal-delete-medicine.component";
import {GridParam, GridParam1} from "../core/service/model/grid-param";


@Component({
  selector: 'kt-employee',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {
  public inforFind: GridParam1;
  isCollapsed = false;
  public form: FormGroup;
  ADD = 'ADD';
  UPDATE = 'UPDATE';
  dataKT: GridDataResult;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public buttonCount = 5;
  public info = true;
  public type: 'numeric' | 'input' = 'numeric';
  pageSizes: Array<number> = [5, 10, 20];
  public previousNext = true;
  public _pageSize = 5;
  public skip = 0;
  // @ViewChild('table') table: GridComponent;
  constructor(private medicineService: MedicineService,
              private modal: NgbModal,
              private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      tenthuoc: new FormControl(''),
      // EmployeeId: new FormControl(''),
    })
    this.loadData();
  }
  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadData()
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadData()
  }
  loadData() {
    const body = {
      skipCount: this.skip,
      pageSize : this._pageSize
    }
    // console.log(this.inforFind)
    // this.inforFind.skipCount = this.skip;
    // this.inforFind.pageSize = this.pageSize;
    this.loading.next(true);
    this.medicineService.getMedicine(body).subscribe((data) => {
      console.log(data)
      this.dataKT = ({
        data : data.Medicine,
        total: data.Totalcount
      })
      this.isLoading$.next(true);
      this.loading.next(false);
    }, error => {
      this.loading.next(false);
    });
  }
  openModalAdd() {
    const modalRef = this.modal.open(ModalAddEitMedicineComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.actionType = this.ADD;
    modalRef.componentInstance.title = 'Thêm mới sản phẩm thuốc'
    modalRef.result.then(result => {
      if (result === 'create') {
        this.loadData();
      }
    }).catch(error => error)
  }

  openModalEdit(dataItem: any) {
    const modalRef = this.modal.open(ModalAddEitMedicineComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.actionType = this.UPDATE;
    modalRef.componentInstance.selectedItem = dataItem;
    modalRef.componentInstance.title = 'Cập nhật sản phẩm thuốc'
    modalRef.result.then(result => {
      if (result === 'update') {
        this.loadData();
      }
    }).catch(error => error)
  }

  openModalDelete($event: any, dataItem: any) {
    const modalRef = this.modal.open(ModalDeleteMedicineComponent);
    modalRef.componentInstance.selectedItem = dataItem;
    modalRef.result.then(result => {
      if (result === 'delete') {
        this.loadData();
      }
    }).catch(error => error)
  }

  search() {
    const body = {
      skipCount: this.skip,
      pageSize : this._pageSize,
      name: this.form.value.tenthuoc,
    }

    this.loading.next(true);
    this.medicineService.searchByName(body).subscribe((data) => {
      console.log(data)
      this.dataKT = ({
        data : data.Medicine,
        total: data.Totalcount
      })
      this.isLoading$.next(true);
      this.loading.next(false);
    }, error => {
      this.loading.next(false);
    });
  }
}

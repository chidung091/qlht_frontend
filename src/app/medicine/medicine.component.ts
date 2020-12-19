import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {MedicineService} from '../_services/medicine.service';
import {GridDataResult, PageChangeEvent} from "@progress/kendo-angular-grid";
import {ModalAddEitMedicineComponent} from "./modal-add-eit-medicine/modal-add-eit-medicine.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalDeleteMedicineComponent} from "./modal-delete-medicine/modal-delete-medicine.component";


@Component({
  selector: 'kt-employee',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {

  isCollapsed = true;
  public form: FormGroup;
  ADD = 'ADD';
  UPDATE = 'UPDATE';
  dataKT: GridDataResult;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public buttonCount = 5;
  public info = true;
  public type: 'numeric' | 'input' = 'numeric';
  public pageSizes = true;
  public previousNext = true;
  public pageSize = 5;
  public skip = 0;
  // @ViewChild('table') table: GridComponent;
  constructor(private medicineService: MedicineService,
              private modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  protected pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.loadData();
  }
  loadData() {
    this.loading.next(true);
    this.medicineService.getMedicine().subscribe((data) => {
      console.log(data)
      this.dataKT = ({
        data : data.Medicine,
        total: data.Totalpages
      })
      // this.dataKT = data
      // if(this.table !== undefined){
      //   this.table.data = data
      // }

      // this.dataKT = {
      //   data: data.slice(this.skip, this.skip + this.pageSize),
      //   total: data.length
      // };
      // console.log(this.dataKT);
      this.isLoading$.next(true);
      this.loading.next(false);
    });
  }
  openModalAdd() {
    const modalRef = this.modal.open(ModalAddEitMedicineComponent, {size: 'md', centered: true});
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

  }
}

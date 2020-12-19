import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {EmployeeService} from '../_services/employee.service';
import {GridDataResult, PageChangeEvent} from "@progress/kendo-angular-grid";
import {ModalAddEitEmployeeComponent} from "./modal-add-eit-employee/modal-add-eit-employee.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalDeleteEmployeeComponent} from "./modal-delete-employee/modal-delete-employee.component";


@Component({
  selector: 'kt-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

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
  constructor(private employeeService: EmployeeService,
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
    this.employeeService.getEmployee().subscribe((data) => {
      console.log(data)
      this.dataKT = ({
        data : data.Userinfo,
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
    const modalRef = this.modal.open(ModalAddEitEmployeeComponent, {size: 'md', centered: true});
    modalRef.componentInstance.actionType = this.ADD;
    modalRef.componentInstance.title = 'Thêm mới nhân viên'
    modalRef.result.then(result => {
      if (result === 'create') {
        this.loadData();
      }
    }).catch(error => error)
  }

  openModalEdit(dataItem: any) {
    const modalRef = this.modal.open(ModalAddEitEmployeeComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.actionType = this.UPDATE;
    modalRef.componentInstance.selectedItem = dataItem;
    modalRef.componentInstance.title = 'Cập nhật nhân viên'
    modalRef.result.then(result => {
      if (result === 'update') {
        this.loadData();
      }
    }).catch(error => error)
  }

  openModalDelete($event: any, dataItem: any) {
    const modalRef = this.modal.open(ModalDeleteEmployeeComponent);
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

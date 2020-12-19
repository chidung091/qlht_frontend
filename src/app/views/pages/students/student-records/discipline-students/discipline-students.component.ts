import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalEditDisciplineStudentsComponent} from './modal-edit-discipline-students/modal-edit-discipline-students.component';
import {GridDataResult} from '@progress/kendo-angular-grid';

@Component({
  selector: 'kt-discipline-students',
  templateUrl: './discipline-students.component.html',
  styleUrls: ['./discipline-students.component.scss']
})
export class DisciplineStudentsComponent implements OnInit {

  isCollapsed: boolean = true;
  checkDisableYear: boolean =false;
  public loading = true;
  pageSizes: Array<number> = [5, 10, 20];
  private skip = 0;
  private _pageSize = 5;
  private buttonCount = 5;


  constructor(public modal: NgbModal,) { }

  gridView: GridDataResult;
  fake = [
    {
      hoTen: 'Nguyễn Văn A', maHocSinh: '123', ngaySinh:new Date(), gioiTinh: 'Nam', lop: '9A', soLanKyLuat: 2
    }
  ]
  ngOnInit(): void {
    this.gridView = ({
      data: this.fake,
      total: 10
    });
  }

  openModalAdd() {

  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    // this.loadData()
  }

  openModalEdit(dataItem: any) {
    const modalRef = this.modal.open(ModalEditDisciplineStudentsComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.title = 'Thêm mới thông tin khen thưởng cán bộ'
    modalRef.result.then(result => {
      if (result === 'create') {
        this.skip = 0;
      }
    })
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {locale} from '../../../../../../core/_config/i18n/vi';
import {ImportFileExcelComponent} from '../../../employee-profile/profile/import-file-excel/import-file-excel.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-according-teacher-list',
  templateUrl: './according-teacher-list.component.html',
  styleUrls: ['./according-teacher-list.component.scss']
})
export class AccordingTeacherListComponent implements OnInit {

  dataItem: any;
  pageSizes: Array<number> = [5, 10, 20];
  _pageSize = 5;
  pageSize = 10;
  skip = 0;
  gridView: GridDataResult;
  mySelection: string[] = [];
  VI_LANG = locale.data;
  @ViewChild('deleteDialog') deleteDialog;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  openImportFileExcel() {
    const dialog = this.modalService.open(ImportFileExcelComponent, {
      size: 'lg',
      centered: true
    });
    dialog.componentInstance.title = 'Import File Excel';
    dialog.result
      .then(() => {
        this.loadDataToGrid();
      })
      .catch((error) => error);
  }

  openModalAdd() {
    alert('Mock up chưa có')
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
  }

  onChange(row: any): void{
    this.mySelection = row;
  }

  copyGrid() {

  }

  loadDataToGrid() {

  }

  openModalDelete(dataItem: any) {
    this.modalService.open(this.deleteDialog, {
      size: 'small',
      centered: true
    });
  }

  closeModalDelete() {
    this.modalService.dismissAll();
  }

  submitDelete() {

  }
}

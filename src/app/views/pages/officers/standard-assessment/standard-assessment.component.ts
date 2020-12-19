import {Component, Injectable, OnInit} from '@angular/core';
import {products} from './products';
import {BehaviorSubject, Observable} from 'rxjs';
import {ManagementModel} from '../../../../core/service/model/management.model';
import {GetManagerments} from '../../../../core/service/actions/managerment-action';
import {Select, Store} from '@ngxs/store';
import {ManagermentService} from '../../../../core/service/service-model/managerment.service';
import {ManagermentState} from '../../../../core/service/states/managerment.state';
import { aggregateBy, process } from '@progress/kendo-data-query';

@Component({
  selector: 'kt-standard-assessment',
  templateUrl: './standard-assessment.component.html',
  styleUrls: ['./standard-assessment.component.scss']
})
export class StandardAssessmentComponent implements OnInit {

  constructor(private store: Store,
              private managermentService: ManagermentService,) {
  }

  public listItems: Array<string> = ['Nhập Excel', 'Xuất từ Excel'];
  public dialogData =[
    {tieuChi:'Tiêu chí 1',noidung:'Đạo đức nhà giáo'},
    {tieuChi:'Tiêu chí 1',noidung:'Đạo đức nhà giáo'},
    {tieuChi:'Tiêu chí 1',noidung:'Đạo đức nhà giáo'},
    {tieuChi:'Tiêu chí 1',noidung:'Đạo đức nhà giáo'},
    {tieuChi:'Tiêu chí 1',noidung:'Đạo đức nhà giáo'},
    {tieuChi:'Tiêu chí 1',noidung:'Đạo đức nhà giáo'},
    {tieuChi:'Tiêu chí 1',noidung:'Đạo đức nhà giáo'},
    {tieuChi:'Tiêu chí 1',noidung:'Đạo đức nhà giáo'},
    {tieuChi:'Tiêu chí 1',noidung:'Đạo đức nhà giáo'},
    {tieuChi:'Tiêu chí 1',noidung:'Đạo đức nhà giáo'},
    {tieuChi:'Tiêu chí 1',noidung:'Đạo đức nhà giáo'},
  ];
  listcanbo: Observable<ManagementModel[]>
  public dropdownData: Array<string> = ['Tốt','Khá','Đạt','Chưa đạt','Chưa đánh giá'];

  isCollapsed = false;
  pageSizes: Array<number> = [10, 20];
  _pageSize = 5;
  public skip = 0;
  collapse = false;
  choose: any;
  public opened = false;
  public aggregates: any[] = [{field: 'UnitPrice', aggregate: 'sum'}];
  arrayBuffer:any;
  exportExcel: boolean=false;
  file:File;
  public total: any = aggregateBy(products, this.aggregates);
  @Select(ManagermentState.manager) totalItem$: Observable<number>;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public  data: any;

  ngOnInit(): void {
    this.loadData();
  }
  incomingfile(event)
  {
    this.file= event.target.files[0];
  }
  public onValueChange(value) {
  }
  loadData(){
    this.store.dispatch(new GetManagerments());
    this.getTableData();
  }
  getTableData() {
    this.listcanbo = this.store.select(ManagermentState.manager);
  }
  show() {
    this.choose= document.getElementById('InOutBoxChoice').style.display
      if(this.choose === 'none'){
        document.getElementById('InOutBoxChoice').style.display = 'block';
      }else{
        document.getElementById('InOutBoxChoice').style.display = 'none';
      }
  }
  option1() {
    document.getElementById('InOutBoxChoice').style.display = 'none';
  }
  option2() {
    document.getElementById('InOutBoxChoice').style.display = 'none';
  }
  public close(status) {
    this.opened = false;
  }

  public open() {
    this.opened = true;
  }

  onChange($event: any[]) {

  }


  pageSizeChange() {
      this.skip = this._pageSize * Math.floor(this.skip/this._pageSize);
      this.loadData();
  }
}

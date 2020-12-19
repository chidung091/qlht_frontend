import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthNoticeService} from '../../../../../core/auth';
import {SmasContextService} from '../../../../../core/_base/layout';
import {Department} from '../../../../../core/service/model/department.model';
import {select, Store as StoreRx} from '@ngrx/store';
import {AppState} from '../../../../../core/reducers';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {DepartmentState} from '../../../../../core/service/states/department.state';
import {ListDepartment} from '../../../../../core/service/actions/department.action';
import {CommonStore} from '../../../../../core/common';

@Component({
  selector: 'kt-receive-switch-work',
  templateUrl: './receive-switch-work.component.html',
  styleUrls: ['./receive-switch-work.component.scss']
})
export class ReceiveSwitchWorkComponent extends CommonStore implements OnInit {
  formSearch: FormGroup;
  defaultFaculty = {facultyName: 'Lựa chọn', id: null};
  pageSizes: Array<number> = [25,50,100,200];
  fakeData: Array<any> = [{
    ProductID: 1,
    ProductName: 'Chai',
    SupplierID: 1,
    CategoryID: 1,
    QuantityPerUnit: '10 boxes x 20 bags',
    UnitPrice: 18.0000,
    UnitsInStock: 39,
    Gender:'Nam',
    DateOfBirth:'18/19/20',
    UnitsOnOrder: 0,
    ReorderLevel: 10,
    Discontinued: false,
    Category: {
      CategoryID: 1,
      CategoryName: 'Beverages',
      Description: 'Soft drinks, coffees, teas, beers, and ales'
    }
  }, {
    ProductID: 2,
    ProductName: 'Chang',
    SupplierID: 1,
    CategoryID: 1,
    QuantityPerUnit: '24 - 12 oz bottles',
    UnitPrice: 19.0000,
    UnitsInStock: 17,
    Gender:'Nam',
    DateOfBirth:'18/19/20',
    UnitsOnOrder: 40,
    ReorderLevel: 25,
    Discontinued: false,
    Category: {
      CategoryID: 1,
      CategoryName: 'Beverages',
      Description: 'Soft drinks, coffees, teas, beers, and ales'
    }
  }, {
    ProductID: 3,
    ProductName: 'Aniseed Syrup',
    SupplierID: 1,
    CategoryID: 2,
    QuantityPerUnit: '12 - 550 ml bottles',
    UnitPrice: 10.0000,
    UnitsInStock: 13,
    Gender:'Nam',
    DateOfBirth:'18/19/20',
    UnitsOnOrder: 70,
    ReorderLevel: 25,
    Discontinued: false,
    Category: {
      CategoryID: 2,
      CategoryName: 'Condiments',
      Description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
    }
  }, {
    ProductID: 4,
    ProductName: 'Chef Anton\'s Cajun Seasoning',
    SupplierID: 2,
    CategoryID: 2,
    QuantityPerUnit: '48 - 6 oz jars',
    UnitPrice: 22.0000,
    UnitsInStock: 53,
    Gender:'Nam',
    DateOfBirth:'18/19/20',
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: false,
    Category: {
      CategoryID: 2,
      CategoryName: 'Condiments',
      Description: 'Sweet and savory sauces, relishes, spreads, and seasonings'
    }
  }]
  _pageSize = 25;
  collapse = false;
  isCollapsed = false;
  data = [];
  public opened = false;
  public pageSize = 10;
  public skip = 0;

  listSchool: string[] = [];

  public mySelection: string[] = [];
  // loading
  public loadDepartment: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // data
  @Select(DepartmentState.listDepartment) dataFaculty$: Observable<Department[]>;
  constructor(
    private modalService: NgbModal,
    private authNoticeService: AuthNoticeService,
    private smasContextService: SmasContextService,
    public storeRx: StoreRx<AppState>,
  ) {
    super(storeRx);
    this.formSearch = new FormGroup({
      staffCode: new FormControl(''),
      nameTeacher: new FormControl(''),
    });
  }

  onChange(row: any) {
    this.mySelection = row;
  }

  ngOnInit(): void {
    // this.getDepartment();
  }
  // call api
  // getDepartment(){
  //   this.dataFaculty$.subscribe(data =>{
  //     if(!data){
  //       this.loadDepartment.next(true);
  //       this.store.dispatch(new ListDepartment()).subscribe(() => {
  //         this.loadDepartment.next(false);
  //       }, error => {
  //         this.loadDepartment.next(false);
  //       });
  //     }
  //   })
  // }
// search
  formatStaffCode() {
    let note = '';
    if (this.formSearch.value.staffCode) {
      note = this.formSearch.value.staffCode.trim();
    }
    this.formSearch.patchValue({
      staffCode: note,
    });
  }

  formatNameTeacher() {
    let note = '';
    if (this.formSearch.value.nameTeacher) {
      note = this.formSearch.value.nameTeacher.trim();
    }
    this.formSearch.patchValue({
      nameTeacher: note,
    });
  }

  changeSubject($event: any, dataItem) {
    console.log(dataItem,'item');
  }

  receiveOfficers(officers: any) {
    console.log(officers,'cán bộ');
  }
}

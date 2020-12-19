import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AllCategoriesRequested, Category, getCate } from 'src/app/core/category';
import { CategoryType } from 'src/app/core/_constants';
import { NgUnsubscribe } from 'src/app/views/shared/directives';
import { ApiStudentService } from '../../service-student/api-student.service';

@Component({
  selector: 'kt-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileStudentComponent extends NgUnsubscribe implements OnInit {

  gridView: GridDataResult;
  isCollapsed: boolean = false;
  public mySelection: string[] = [];
  public skip = 0;
  _pageSize = 10;
  pageSizes: Array<number> = [10, 20, 50, 100];
  defaultListData = { cateName: 'Tất cả', id: null };
  ListBlockCode$: Observable<Category[]> //Khối
  ListGender$: Observable<Category[]> //Giớ tính
  ListEthnicCode$: Observable<Category[]> //Dân tộc
  ListStatusCode$: Observable<Category[]> //trạng thái

  listBtn: Array<any> = [
    {
      text: 'Nhập từ Excel',
      url: 'aaa.com'
    },
    {
      text: 'Xuất mẫu Import',
      url: 'bbb.com'
    },
    {
      text: 'Xuất Excel thông tin học sinh',
      url: 'ccc.com'
    },
  ];

  dataButtonFix: Array<any> = [
    { id: '1', text: 'Chi tiết hồ sơ học sinh' },
    { id: '2', text: 'Quá trình học tập' },
    { id: '3', text: 'Khen thưởng, kỷ luật', },
    { id: '4', text: 'Vi phạm, nghỉ học, miễn giảm' },
    { id: '5', text: 'Kêt quả khám sức khỏe định kỳ' },
  ];

  constructor(
    private api: ApiStudentService,
    private store: Store,
    public router: Router,
  ) {
    super()
  }

  ngOnInit(): void {
    this.getDataFromStore();
    this.getAllStudent();
  }

  DetailStudent(dataItem, dataGridItem) {
    console.log(dataGridItem)
    console.log(dataItem)
    this.router.navigateByUrl('students/student-records/officers/detail-profile-studen/' + dataGridItem.classId);
  }

  getDataFromStore() {
    //DM_KHOI
    this.ListBlockCode$ = this.store.pipe(select(getCate, CategoryType.DM_KHOI), takeUntil(this.ngUnsubscribe));
    this.ListBlockCode$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({ categoryCode: CategoryType.DM_KHOI }))
      }
    })
    //DM_GIOI_TINH
    this.ListGender$ = this.store.pipe(select(getCate, CategoryType.DM_GIOI_TINH), takeUntil(this.ngUnsubscribe));
    this.ListGender$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({ categoryCode: CategoryType.DM_GIOI_TINH }))
      }
    })

    //DM_DAN_TOC
    this.ListEthnicCode$ = this.store.pipe(select(getCate, CategoryType.DM_DAN_TOC), takeUntil(this.ngUnsubscribe));
    this.ListEthnicCode$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({ categoryCode: CategoryType.DM_DAN_TOC }))
      }
    })

    //DM_TRANG_THAI_HOC_SINH
    this.ListStatusCode$ = this.store.pipe(select(getCate, CategoryType.DM_TRANG_THAI_HOC_SINH), takeUntil(this.ngUnsubscribe));
    this.ListStatusCode$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({ categoryCode: CategoryType.DM_TRANG_THAI_HOC_SINH }))
      }
    });

  }

  getAllStudent() {
    let input = {
      sort: 'creationTime',
      sortDirection: 1,
      filterItems: [],
      skipCount: this.skip,
      maxResultCount: this._pageSize
    }
    this.api.getAllStudent(input).subscribe(data => {
      this.gridView = ({
        data: data.items,
        total: data.totalCount
      });
    })
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.getAllStudent();
  }

  onChange(row) {
    this.mySelection = row;
    if (this.mySelection.length > 0) {
      //this.disableBtnDele = false;
    } else {
      //this.disableBtnDele = true;
    }
  }


}

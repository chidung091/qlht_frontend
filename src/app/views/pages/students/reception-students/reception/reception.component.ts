import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {AllCategoriesRequested, Category, getCate, getCateLoaded} from '../../../../../core/category';
import {takeUntil} from 'rxjs/operators';
import {CategoryType} from '../../../../../core/_constants';
import {NgUnsubscribe} from '../../../../shared/directives';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../../core/reducers';
import {Router} from '@angular/router';
import {locale} from '../../../../../core/_config/i18n/vi';
import {PageChangeEvent} from '@progress/kendo-angular-grid';

@Component({
  selector: 'kt-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent extends NgUnsubscribe implements OnInit {
  VI_LANG = locale.data;
  isCollapsed = false;
  searchForm: FormGroup;
  public mySelection: string[] = [];
  checkDeleteMany=true;
  skip=0;
  _pageSize=5;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pageSizes: Array<number> = [10, 20, 50, 100];

  gridView=[
    {id:'1',fullName:'Giàng A Tống',studentCode:'123A23',gender:'Nam',classification:'7A',profile:'11',receptionFrom:'THCS Chu Van An',receptionTo:'THCS BIBI'},
    {id:'2',fullName:'A Phủ',studentCode:'1111',gender:'Nam',classification:'7A',profile:'11',receptionFrom:'THCS Chu Van An',receptionTo:'THCS BIBI'}
  ]

  // Danh mục giới tính - Giới tính
  gender$: Observable<Category[]>;
  genderLoaded$: Observable<boolean>;
  defaultCategory= {cateCode: null, cateName: 'Lựa chọn'};


  public buildForm(){
    this.searchForm = this.fb.group({
      fullName: new FormControl('',[]),
      studentCode:new FormControl('',[]),
      gender:new FormControl('',[]),
      districtCode:new FormControl('',[]),
      receptionFromSchool:new FormControl('',[]),
      receptionTo:new FormControl('',[])
    })
  }

  constructor(
    public router: Router,
    private store: Store<AppState>,
    private  fb:FormBuilder
  ) {
    super();
  }
  ngOnInit(): void {
    this.buildForm();
    this.initCates();
    this.fetchGender();
  }

  fetchGender(): void {
    this.gender$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if(!response) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_GIOI_TINH}));
      }
    })
  }

  searchStudent(){
    return null;
  }

  initCates(){
    // Danh mục giới tính - Giới tính
    this.gender$ = this.store.pipe(select(getCate, CategoryType.DM_GIOI_TINH), takeUntil(this.ngUnsubscribe));
    this.genderLoaded$ = this.store.pipe(select(getCateLoaded, CategoryType.DM_GIOI_TINH), takeUntil(this.ngUnsubscribe));
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    //this.getAllRole();
  }

  onChange(row) {
    this.mySelection = row;
    if (this.mySelection.length > 0) {
      //this.disableBtnDele = false;
    } else {
      //this.disableBtnDele = true;
    }
  }
  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    // this.fetchAll();
  }



}

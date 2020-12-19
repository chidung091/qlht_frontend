import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {GridDataResult, PageChangeEvent, SelectableSettings} from '@progress/kendo-angular-grid';
import {ConcurrentWorkTypeService} from '../../../../core/service/service-model/concurrent-work-type.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {ConcurrentWorkTypeModel} from '../../../../core/service/model/concurrent-work-type.model';
import {NotiService} from '../../../../core/service/service-model/notification.service';
import {Policies} from '../../../../core/_constants/policy.constants';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {locale} from '../../../../core/_config/i18n/vi';
import {CatalogService} from '../../../../core/service/service-model/catalog.service';
import {Category, ListCateCode} from '../../../../core/category/_models/category.model';
import {select} from '@ngrx/store';
import {AllCategoriesRequested, getCate} from '../../../../core/category';
import {AppState} from '../../../../core/reducers';
import {Store as StoreRx} from '@ngrx/store';

@Component({
  selector: 'kt-concurrent-work-type',
  templateUrl: './concurrent-work-type.component.html',
  styleUrls: ['./concurrent-work-type.component.scss']
})
export class ConcurrentWorkTypeComponent implements OnInit {
  VI_LANG = locale.data;
  // @Select(ConcurrentWorkTypeState.getAll) concurrentWorkTypes$;
  // searchValue: any;
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  listConcurrentWorkType: ConcurrentWorkTypeModel[];
  listConcurrentWorkType222: ConcurrentWorkTypeModel[];
  workCreate: ConcurrentWorkTypeModel[];
  totalCount: number;
  keyWord = '';
  skip = 0;
  actionDialog = '';
  data: any;
  rowsSelected: number[];
  public gridView: GridDataResult;
  public mySelection: string[] = [];
  _pageSize = 5;
  pageSizes: Array<number> = [10, 20];
  public selectTableSetting: SelectableSettings = {
    checkboxOnly: true
  }
  public buttonCount = 5;
  public boolPage: boolean;
  public boolEdit = false;
  roleEdit: string = Policies.CATEGORYMANAGEMENT_CONCURRENTWORKTYPE_EDIT
  formDataPut: any;
  modalOptions: NgbModalOptions;
  closeResult: string;
  formOutput: FormControl;
  textWork = '';
  catalogWork = ListCateCode.dmNhiemVuKiemNhiem
  catalogList$: Observable<Category[]>;
  catalogList: Category[];
  sameWork: number;
  public okLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private concurrentWorkTypeService: ConcurrentWorkTypeService,
              private notiService: NotiService,
              private modalService: NgbModal,
              private storeRx: StoreRx<AppState>,) {
    this.catalogList$ = this.storeRx.pipe(select(getCate, this.catalogWork));
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      centered: true,
    }
    this.mapApiObject();
  }

  open(content, at) {
    this.setAction(at)
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public closeModal() {
    this.modalService.dismissAll('Cross click');
  }

  ngOnInit(): void {
    // this.loadDataCatalog();
    this.loadData()
    // this.mapApiObject()
  }
   mapApiObject(){
     this.concurrentWorkTypeService.getAllCon().subscribe( data => {
       if(data){
         this.workCreate = data;
         this.catalogList$.subscribe(value => {
           if(!value){
             this.storeRx.dispatch(new AllCategoriesRequested({categoryCode: this.catalogWork}));
           } else {
             this.catalogList = value;
             this.listConcurrentWorkType222 = this.catalogList.map(item => {
               let e: ConcurrentWorkTypeModel[];
               e = (this.workCreate.filter(datas => datas.code === item.cateCode));
               this.sameWork = e.length;
               if(e.length > 0){
                 return new ConcurrentWorkTypeModel(e[0].id, item.cateName, item.cateCode, e[0].sectionPerWeek, e[0].description);
               } else{
                 return new ConcurrentWorkTypeModel(null, item.cateName, item.cateCode, 0, '');
               }
             })
             if(this.sameWork === 0){
               const param ={
                 workExperimentalDtos: this.listConcurrentWorkType222
               };
               this.concurrentWorkTypeService.postCon(param).subscribe(value1 => {})
               this.loadData()
             }
           }
         })
       }
     })
   }


  search(value) {
    this.keyWord = value.expWork;
    this.skip = 0;
    this.loadData();
  }

  setAction(at: string) {
    this.actionDialog = at;
    if (this.actionDialog === 'edit') {
      this.textWork = ' Cập nhật công việc kiêm nhiệm';
    }
  }

  deleteAction() {
    this.data = this.rowsSelected;
    this.setAction('delete');
  }

  public onChange(rows: number[]) {
    this.rowsSelected = rows;
  }

  // }
  editAction(content, dataItem: any, at) {
    this.setAction(at)
    this.data = dataItem;
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // this.setAction('edit');
    document.getElementById('editAction').focus();
  }

  // editAction(dataItem: any) {
  //   this.data = dataItem;
  //   this.setAction('edit');

  loadData() {
    this.boolPage = true;
    this.concurrentWorkTypeService.getPagination(this.keyWord, this._pageSize, this.skip)
      .subscribe(value => {
          this.listConcurrentWorkType = value.items,
            this.totalCount = value.totalCount
          this.isLoading.next(false);
          this.gridView = ({
            data: this.listConcurrentWorkType,
            total: this.totalCount
          });
          this.isLoading.next(true);
          this.boolPage = false;
        }
      )
  }
  loadDataCatalog(){
    this.boolPage = true;
    // for(let i = 0; i < this.catalogList.length; i++){
    //   this.workObject.code = this.catalogList[i].cateCode
    //   this.workObject.name = this.catalogList[i].cateName
    //   this.workCreate.push(this.workObject);
    // }
    // this.concurrentWorkTypeService.postCon(this.catalogList)
    this.concurrentWorkTypeService.getPagination(this.keyWord, this._pageSize, this.skip)
      .subscribe(value1 => {
          this.listConcurrentWorkType = value1.items,
            this.totalCount = value1.totalCount
          this.isLoading.next(false);
          // for(let i = 0; i < data.length; i++){
          //   this.listConcurrentWorkType.push(data)
          // }
          this.gridView = ({
            data: this.listConcurrentWorkType,
            total: this.totalCount
          });
          this.isLoading.next(true);
          this.boolPage = false;
        }
      )
    // this.concurrentWorkTypeService.getPagination(this.keyWord, this._pageSize, this.skip).pipe(
    //   map(values => {
    //     const value = values[0]
    //   })
    // )
  }

  pageChange(event: PageChangeEvent) {
    this.skip = event.skip;
    this.loadData();
  }

  pageSizeChange() {
    this.skip = this._pageSize * Math.floor(this.skip / this._pageSize);
    this.loadData();
  }

  putData(value) {
    this.formOutput = value
    this.formDataPut = {
      id: this.data.id,
      name: this.formOutput.value.name,
      sectionPerWeek: +this.formOutput.value.sectionPerWeek,
      description: this.formOutput.value.description,
      code: this.data.code
    }
  }

  actionWork() {
    if (this.formOutput.invalid) {
      this.notiService.fillFullInfoWarning();
    } else if (this.actionDialog === 'edit') {
      this.okLoading.next(true)
      this.concurrentWorkTypeService.putCon(this.data.id, this.formDataPut).subscribe(() => {
        this.notiService.updateSuccess();
        this.okLoading.next(false)
        this.loadData();
        this.closeModal()
      }, () => {
        this.okLoading.next(false)
      })
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PageChangeEvent} from '@progress/kendo-angular-grid';
import {Store, Store as StoreRx} from '@ngrx/store'
import {SmasContextService} from '../../../../../core/_base/layout';
import {CommonStore} from '../../../../../core/common';
import {AppState} from '../../../../../core/reducers';
import { SmasConText } from 'src/app/core/_base/layout/models/smas-context.model';
import { finalize, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HonourAchivementService } from '../../honour-achivement/honour-achivement-sevice/honour-achivement.service';
import { TeacherSubstituonsService } from './api-or-model/teacher-substituons.service';

@Component({
  selector: 'kt-list-head-teacher-substituons',
  templateUrl: './list-head-teacher-substituons.component.html',
  styleUrls: ['./list-head-teacher-substituons.component.scss']
})
export class ListHeadTeacherSubstituonsComponent extends CommonStore implements OnInit {

  checkYearDisabled = false;
  disableBtnDele = false;
  isCollapsed = false;
  isLoadingTC = false;
  isCheckTeacher = false;
  gradePickNumber = 0;
  defaultListSubjects: { id: string, facultyName: string } = {facultyName: 'Tất cả', id: null};
  defaultListTeacher = {fullName: 'Tất cả', id: null};
  formSearch: FormGroup;
  listOfficer: any;
  defaultlistOfficer = { fullName: 'Lựa chọn', id: null };
  dataFilter: SmasConText;
  
  constructor(
    public store: Store<AppState>,
    private smasContextService: SmasContextService,
    private fb: FormBuilder,
    private apiGetTeacher: HonourAchivementService,
    private apiteacherSubstituons: TeacherSubstituonsService,
    private cdRef: ChangeDetectorRef,
  ) {
    super(store);
    this.smasContextService.onConfigUpdated$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.dataFilter = this.smasContextService.getSmasConText();
      if (this.dataFilter.year) {
        if (this.dataFilter.year && this.dataFilter.year.currentYear === false) {
          this.checkYearDisabled = true;
          this.disableBtnDele = true;
        } else {
          this.checkYearDisabled = false;
        }
        this.getAllData();
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formSearch = this.fb.group({
      ToBoMon: new FormControl(''),
      teacher: new FormControl({ value: '', disabled: true }),
    })
  }

  getTeacher(facultyId){
    if(facultyId === null){
      this.formSearch.controls['teacher'].setValue(null);
      this.formSearch.controls.teacher.enable();
      return
    }
    this.formSearch.controls['teacher'].setValue(null);
    this.isLoadingTC = true;
    this.apiGetTeacher.getOfficerByFacultyId(facultyId)
      .pipe(
        finalize(()=>{
          this.isLoadingTC = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe(data => {
        this.isLoadingTC = false;
        if (data.length > 0) {
          this.listOfficer = data;
          this.isCheckTeacher = false;
          this.formSearch.controls.teacher.enable();
        } else {
          this.isCheckTeacher = true;
          this.formSearch.controls['teacher'].setValue(null);
          this.formSearch.controls.teacher.disable();
        }
      }, error => {
        this.isLoadingTC = false;
      })
  }

  changeGrade(data, index){
    this.gradePickNumber = index;
    console.log(data);
    if(this.dataFilter.year && this.dataFilter.year.id){
      this.apiteacherSubstituons.getAllByBlock(this.dataFilter.year.id, data.cateCode).subscribe(data=>{
        console.log(data)
      })
    }
  }

  getAllData(){
    this.grade$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(value => {
      console.log(value)
      if(value){
        
      }
    })
  }

  onChange(row: any) {
  
  }

  pageSizeChange() {
  
  }

  pageChange(event: PageChangeEvent) {
   
  }

  openModalAdd() {
    // const modalRef = this.modal.open(ModalAddEditHeadTeacherSubstitutionsComponent, {size: 'md', centered: true});
    // modalRef.componentInstance.title = 'Thêm mới làm thay chủ nhiệm';
  }

  openModalDelete() {
    // const modalRef = this.modal.open(ModalDeleteHeadTeacherAssignmentComponent, {centered: true})
  }

  openModalEdit(dataItem: any) {
    // const modalRef = this.modal.open(ModalAddEditHeadTeacherSubstitutionsComponent);
    // modalRef.componentInstance.title = 'Cập nhật làm thay chủ nhiệm';
  }
}

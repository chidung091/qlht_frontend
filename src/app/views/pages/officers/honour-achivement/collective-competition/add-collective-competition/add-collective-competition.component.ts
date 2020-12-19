import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AllCategoriesRequested, Category, getCate } from 'src/app/core/category';
import { CommonStore } from 'src/app/core/common';
import { AppState } from 'src/app/core/reducers';
import { CategoryType } from 'src/app/core/_constants';
import { HonourAchivementService } from '../../honour-achivement-sevice/honour-achivement.service';
import { Achivement } from '../../honour-achivement-sevice/model-honour-achivement';

@Component({
  selector: 'kt-add-collective-competition',
  templateUrl: './add-collective-competition.component.html',
  styleUrls: ['./add-collective-competition.component.scss']
})
export class AddCollectiveCompetitionComponent extends CommonStore implements OnInit {

  formAdd: FormGroup;
  isloading = false;
  title: string;
  YearCode: string;
  schoolYearId: string;
  listEmulation$: Observable<Category[]>
  listEmulation = [];
  defaultlistSubjects = { facultyName: 'Lựa chọn', id: null };
  defaultlistEmulation = { cateName: 'Lựa chọn', id: null };
  submitted = false;
  idTT: string;
  facultyName: string;
  facultyId: string;
  honourAchivementName: string;
  @ViewChild('tobomon') tobomon: DropDownListComponent;

  constructor(
    private api: HonourAchivementService,
    private fb: FormBuilder,
    public _NgbActiveModal: NgbActiveModal,
    private toastr: ToastrService,
    public store: Store<AppState>,
  ) {
    super(store);
  }

  get f() {
    return this.formAdd.controls;
  }

  ngOnInit(): void {
    this.formAdd = this.fb.group({
      toboMon: new FormControl({ value: '', disabled: false }, [Validators.required]),
      honourAchivement: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.maxLength(250)]),
    });

    if (this.idTT) {
      this.getDetail();
      this.formAdd.controls.toboMon.disable();
    }

    this.getEmulation();
  }

  getEmulation() {
    //DM_DANH_HIEU_TAP_THE
    this.listEmulation$ = this.store.pipe(select(getCate, CategoryType.DM_DANH_HIEU_TAP_THE), takeUntil(this.ngUnsubscribe));
    this.listEmulation$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({ categoryCode: CategoryType.DM_DANH_HIEU_TAP_THE }))
      }else{
        this.listEmulation = value
      }
    });
  }

  getDetail() {
    this.api.detailTT(this.idTT).subscribe(data => {
      this.formAdd.controls['toboMon'].setValue(data.facultyId);
      this.formAdd.controls['honourAchivement'].setValue(data.achivementCode);
      this.formAdd.controls['description'].setValue(data.description);
      this.facultyName = data.facultyName;
      this.honourAchivementName = data.achivementName;
      this.facultyId = data.facultyId;
      this.schoolYearId = data.schoolYearId;
    })
  }

  trimSpace(formName: string) {
    if (formName) {
      this.formAdd.get(formName).setValue(
        this.formAdd.get(formName).value?.trim().replace(/(\s\s+| )/g, ' ')
      )
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.formAdd.invalid) {
      return;
    }
    this.schoolFaculty$.subscribe(data => {
      data.forEach(x => {
        if (x.id === this.formAdd.value.toboMon) {
          this.facultyName = x.facultyName;
        }
      })
    })
    if (this.formAdd.value.honourAchivement) {
      this.listEmulation.forEach(x => {
        if (x.cateCode === this.formAdd.value.honourAchivement) {
          this.honourAchivementName = x.cateName
        }
      })
    }
    let input = {
      facultyId: this.facultyId ? this.facultyId : this.formAdd.value.toboMon,
      facultyName: this.facultyName,
      achivementCode: this.formAdd.value.honourAchivement,
      achivementName: this.honourAchivementName,
      description: this.formAdd.value.description,
      schoolYear: this.YearCode,
      schoolYearId: this.schoolYearId
    }
    if (this.idTT) {
      this.isloading = true;
      this.api.Edit(this.idTT, input).subscribe(() => {
        this.toastr.success('Cập nhật thành công.');
        this._NgbActiveModal.close('ok')
        this.isloading = false;
      }, e => {
        this.isloading = false;
      })
    } else {
      this.isloading = true;
      this.api.Create(input).subscribe(() => {
        this.toastr.success('Thêm thành công.');
        this._NgbActiveModal.close('ok')
        this.isloading = false;
      }, e => {
        this.isloading = false;
      })
    }
  }

  cancel() {
    this._NgbActiveModal.close()
  }

}

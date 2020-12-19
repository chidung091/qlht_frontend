import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize, takeUntil } from 'rxjs/operators';
import { CommonStore } from 'src/app/core/common';
import { HonourAchivementService } from '../../honour-achivement-sevice/honour-achivement.service';
import { Achivement } from '../../honour-achivement-sevice/model-honour-achivement';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { Observable } from 'rxjs';
import { AllCategoriesRequested, Category, getCate } from 'src/app/core/category';
import { CategoryType } from 'src/app/core/_constants';

@Component({
  selector: 'kt-add-emulation-title',
  templateUrl: './add-emulation-title.component.html',
  styleUrls: ['./add-emulation-title.component.scss']
})
export class AddEmulationTitleComponent extends CommonStore implements OnInit {

  title: string;
  listOfficer: any;
  formAdd: FormGroup;
  isloading = false;
  submitted = false;
  isLoadingTC = false;
  isCheckTeacher = false;
  idDHTHD: string;
  employeeId: string;
  facultyId: string;
  facultyName: string;
  schoolYearCode: string;
  schoolYearId: string;
  listAchivement = [];
  listAchivement$: Observable<Category[]>
  defaultlistSubjects = { facultyName: 'Lựa chọn', id: null };
  defaultlistOfficer = { fullName: 'Lựa chọn', id: null };
  defaultlistAchivement = { cateName: 'Lựa chọn', id: null };
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
    // this.getSubjects()
    this.formAdd = this.fb.group({
      idFaculty: new FormControl({ value: '', disabled: false }, [Validators.required]),
      employeeId: new FormControl({ value: '', disabled: true }, Validators.required),
      honourAchivement: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.maxLength(250)]),
    });
    if (this.idDHTHD) {
      this.formAdd.controls.idFaculty.disable();
    }
    this.getDetail();
    this.getAchivement();
  }

  getStudent(facultyId) {
    this.formAdd.controls['employeeId'].setValue(null);
    this.isLoadingTC = true;
    this.api.getOfficerByFacultyId(facultyId)
      .pipe(
        finalize(() => {
          this.isLoadingTC = false;
        })
      )
      .subscribe(data => {
        this.isLoadingTC = false;
        if (data.length > 0) {
          this.listOfficer = data;
          if (this.title === 'Thêm danh hiệu thi đua') {
            this.formAdd.controls.employeeId.enable();
          }
          this.isCheckTeacher = false;
        } else {
          this.isCheckTeacher = true;
          this.formAdd.controls['employeeId'].setValue(null);
          this.formAdd.controls.employeeId.disable();
        }
      }, error => {
        this.isLoadingTC = false;
      })
  }

  getDetail() {
    if (this.idDHTHD) {
      this.isloading = true;
      this.api.detailDHTD(this.idDHTHD).subscribe(data => {
        this.isloading = false;
        this.formAdd.controls['idFaculty'].setValue(data.facultyId);
        this.formAdd.controls['employeeId'].setValue(data.employeeId);
        this.formAdd.controls['honourAchivement'].setValue(data.achivementCode);
        this.formAdd.controls['description'].setValue(data.description);
        this.schoolYearCode = data.schoolYear
        this.schoolYearId = data.schoolYearId
        this.facultyId = data.facultyId;
        this.employeeId = data.employeeId;
        this.facultyName = data.facultyName;
      }, e => {
        this.isloading = false;
      })
    }
  }

  getAchivement() {
    //DM_DANH_HIEU
    this.listAchivement$ = this.store.pipe(select(getCate, CategoryType.DM_DANH_HIEU_THI_DUA), takeUntil(this.ngUnsubscribe));
    this.listAchivement$.subscribe(value => {
      if (!value) {
        this.store.dispatch(new AllCategoriesRequested({ categoryCode: CategoryType.DM_DANH_HIEU_THI_DUA }))
      }else{
        this.listAchivement = value
      }
    });
  }

  trimSpace(formName: string) {
    if (formName) {
      this.formAdd.get(formName).setValue(
        this.formAdd.get(formName).value?.trim().replace(/(\s\s+| )/g, ' ')
      )
    }
  }

  cancel() {
    this._NgbActiveModal.close();
  }

  onSubmit() {
    this.submitted = true;
    if (this.formAdd.invalid) {
      return;
    }
    if (this.isCheckTeacher === true) {
      return;
    }

    let facultyName = '';
    let achivementName = '';
    this.schoolFaculty$.subscribe(data => {
      data.forEach(x => {
        if (x.id === this.formAdd.value.idFaculty) {
          facultyName = x.facultyName;
        }
      })
    })

    this.listAchivement.forEach(x => {
      if (this.formAdd.value.honourAchivement === x.cateCode) {
        achivementName = x.cateName
      }
    })

    const input = {
      facultyId: this.facultyId ? this.facultyId : this.formAdd.value.idFaculty,
      facultyName: this.facultyName ? this.facultyName : facultyName,
      employeeId: this.employeeId ? this.employeeId : this.formAdd.value.employeeId,
      achivementCode: this.formAdd.value.honourAchivement,
      achivementName: achivementName,
      schoolYear: this.schoolYearCode,
      schoolYearId: this.schoolYearId,
      description: this.formAdd.value.description
    }
    if (this.idDHTHD) {
      this.isloading = true;
      this.api.EditCb(this.idDHTHD, input).subscribe(() => {
        this.toastr.success('Cập nhật thành công.');
        this._NgbActiveModal.close('ok')
        this.isloading = false;
      }, error => {
        this.isloading = false;
      })
    } else {
      this.isloading = true;
      this.api.CreateCb(input).subscribe(() => {
        this.toastr.success('Thêm thành công.');
        this._NgbActiveModal.close('ok')
        this.isloading = false;
      }, error => {
        this.isloading = false;
      })
    }
  }

}

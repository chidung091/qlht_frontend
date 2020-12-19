import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DropDownListComponent} from '@progress/kendo-angular-dropdowns';
import {EmployeeService} from '../../../../../core/service/service-model/employee.service';
import {SmasContextService} from '../../../../../core/_base/layout';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {CatalogService} from '../../../../../core/service/service-model/catalog.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeProfileModel} from '../../../../../core/service/model/Employee-profile';
import {EmployeePraiseService} from '../../../../../core/service/service-model/employee-praise.service';
import {AllCategoriesRequested, Category, getCate, getCateLoaded} from '../../../../../core/category';
import {CategoryType} from '../../../../../core/_constants';
import {SmasConText} from '../../../../../core/_base/layout/models/smas-context.model';
import {CommonStore} from '../../../../../core/common';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../../core/reducers';
import {locale} from '../../../../../core/_config/i18n/vi';
import {formatDate} from '@angular/common';

@Component({
  selector: 'kt-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.scss']
})
export class ModalAddEditComponent extends CommonStore implements OnInit, AfterViewInit {
  public defaultItemSchoolFaculty: { id: string, facultyName: string } = {facultyName: 'Lựa chọn', id: null};
  public defaultItemEmployee: { id: string, fullName: string } = {fullName: 'Lựa chọn', id: null};
  public defaultItemDMKTGV: { id: string, cateName: string } = {cateName: 'Lựa chọn', id: null};
  listEmployee: EmployeeProfileModel[];
  form: FormGroup
  @Input() selectedItem: any;
  @Input() title: any;
  @ViewChild('employeeName') employeeName: DropDownListComponent;
  @ViewChild('schoolFaculty') schoolFaculty: DropDownListComponent;
  @ViewChild('praiseDetailContent') praiseDetailContent: ElementRef;
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadEmployee = false;
  submitted = false;
  public maxDate = new Date();
  listDanhMucKTGV$: Observable<Category[]>;
  loadingKhenThuong$: Observable<boolean>;
  VI_LANG = locale.data;
  private namHocObj: SmasConText;

  constructor(private _NgbActiveModal: NgbActiveModal,
              private fb: FormBuilder,
              public store: Store<AppState>,
              private employeeService: EmployeeService,
              private smasContextService: SmasContextService,
              private catalogService: CatalogService, private notiService: NotiService,
              private cdfRef: ChangeDetectorRef,
              private employeePraiseService: EmployeePraiseService) {
    super(store);
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.initCates();
    this.getYear();
    this.loadDanhMucKhenThuongGV();
    this.form = this.fb.group({
      facultyName: new FormControl('', [Validators.required]),
      facultyId: new FormControl('', [Validators.required]),
      employeeId: new FormControl({value: '', disabled: true}, [Validators.required]),
      employeeName: new FormControl('', [Validators.required]),
      praiseDetailContent: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      praiseLevelName: new FormControl('', [Validators.maxLength(250)]),
      praiseFormCode: new FormControl(''),
      praiseFormName: new FormControl(''),
      decisionNumber: new FormControl('', [Validators.maxLength(250)]),
      decisionDate: new FormControl(null),
      description: new FormControl('', [Validators.maxLength(500)]),
      schoolYearId: new FormControl(this.namHocObj.year.id),
      schoolYearName: new FormControl(this.namHocObj.year.code),
      envidenceFileUrl: new FormControl(''),
      isEditable: new FormControl(true)
    })
    if (this.selectedItem) {
      this.form.get('facultyName').setValue(this.selectedItem.facultyName);
      this.form.get('facultyId').setValue(this.selectedItem.facultyId);
      this.form.get('employeeId').setValue(this.selectedItem.employeeId);
      this.form.get('praiseDetailContent').setValue(this.selectedItem.praiseDetailContent);
      this.form.get('praiseLevelName').setValue(this.selectedItem.praiseLevelName);
      this.form.get('praiseFormCode').setValue(this.selectedItem.praiseFormCode);
      this.form.get('praiseFormName').setValue(this.selectedItem.praiseFormName);
      this.form.get('decisionNumber').setValue(this.selectedItem.decisionNumber);
      this.form.get('decisionDate').setValue(this.selectedItem.decisionDate ? new Date(this.selectedItem.decisionDate) : null);
      this.form.get('description').setValue(this.selectedItem.description);
      this.form.get('schoolYearId').setValue(this.selectedItem.schoolYearId);
      this.form.get('schoolYearName').setValue(this.selectedItem.schoolYearName);
      this.form.get('envidenceFileUrl').setValue(this.selectedItem.envidenceFileUrl);
      this.form.get('isEditable').setValue(this.selectedItem.isEditable);
      this.form.controls.employeeId.disable();
      this.form.controls.facultyId.disable();
      this.employeeService.getEmployeeByFacultyId(this.selectedItem.facultyId).subscribe(data => {
        this.listEmployee = data
      })
      this.form.get('employeeName').setValue(this.selectedItem.employeeName);
    }
  }

  ngAfterViewInit() {
    if (this.selectedItem) {
      setTimeout(() => {
        this.praiseDetailContent.nativeElement.focus()
        this.praiseDetailContent.nativeElement.select()
      }, 10)
    } else {
      setTimeout(() => {
        this.schoolFaculty.focus()
      }, 10)
    }
  }

  trimSpace(formName: string) {
    if (formName) {
      this.form.get(formName).setValue(
        this.form.get(formName).value?.trim().replace(/(\s\s+| )/g, ' ')
      )
    }
  }

  getYear() {
    this.smasContextService.onConfigUpdated$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
    });
    this.namHocObj = this.smasContextService.getSmasConText();
  }

  initCates() {
    this.listDanhMucKTGV$ = this.store.pipe(select(getCate, CategoryType.DM_KHEN_THUONG_GV), takeUntil(this.ngUnsubscribe));
    this.loadingKhenThuong$ = this.store.pipe(select(getCateLoaded, CategoryType.DM_KHEN_THUONG_GV), takeUntil(this.ngUnsubscribe));
  }

  loadDanhMucKhenThuongGV() {
    this.listDanhMucKTGV$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (!response) {
        this.store.dispatch(new AllCategoriesRequested({categoryCode: CategoryType.DM_KHEN_THUONG_GV}));
      }
    })
  }

  public cancel() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.selectedItem) {
      const put = {
        id: this.selectedItem.id,
        facultyName: this.form.get('facultyName').value,
        facultyId: this.form.get('facultyId').value,
        praiseDetailContent: this.form.get('praiseDetailContent').value,
        praiseLevelName: this.form.get('praiseLevelName').value,
        praiseFormCode: this.form.get('praiseFormCode').value,
        praiseFormName: this.form.get('praiseFormName').value,
        decisionNumber: this.form.get('decisionNumber').value,
        decisionDate: this.form.get('decisionDate').value ? formatDate(this.form.value.decisionDate, 'yyyy-MM-dd', 'en') : '',
        description: this.form.get('description').value,
        envidenceFileUrl: this.form.get('envidenceFileUrl').value,
        isEditable: this.form.get('isEditable').value,
      }
      this.loading.next(true);
      this.employeePraiseService.updateEmployeePraise(put, this.selectedItem.employeeId).subscribe(() => {
          this.activeModal.close('update');
          this.notiService.updateSuccess();
          this.loading.next(false);
        }, error => {
          this.loading.next(false);
        }
      )
    } else {
      const id = this.form.value.employeeId;
      const payload = {
        facultyName: this.form.value.facultyName,
        facultyId: this.form.value.facultyId,
        employeeName: this.form.value.employeeName,
        praiseDetailContent: this.form.value.praiseDetailContent,
        praiseLevelName: this.form.value.praiseLevelName,
        praiseFormCode: this.form.value.praiseFormCode = null ? '' : this.form.controls.praiseFormCode.value,
        praiseFormName: this.form.value.praiseFormName,
        decisionNumber: this.form.value.decisionNumber,
        decisionDate: this.form.value.decisionDate ? formatDate(this.form.value.decisionDate, 'yyyy-MM-dd', 'en') : '',
        description: this.form.value.description,
        schoolYearId: this.form.value.schoolYearId,
        schoolYearName: this.form.value.schoolYearName,
        envidenceFileUrl: this.form.value.envidenceFileUrl,
        isEditable: this.form.value.isEditable,
      }
      this.loading.next(true);
      this.employeePraiseService.addEmployeePraise(payload, id).subscribe(() => {
        this.activeModal.close('create');
        this.notiService.createSuccess();
        this.loading.next(false);
      }, error => (
        this.loading.next(false)))
    }
  }

  changeSchoolFaculty(event) {
    this.employeeName.reset();
    this.form.get('facultyName').setValue(event.facultyName);
    if (event.id == null) {
      this.form.controls.employeeId.setValue('');
      this.form.controls.employeeId.disable()
      this.loadEmployee = false;
    } else {
      this.employeeName.reset();
      this.form.controls.employeeId.setValue('');
      this.form.controls.employeeId.enable()
      this.loadEmployee = true;
      this.employeeService.getEmployeeByFacultyId(event.id)
        .pipe(
          finalize(() => {
            this.loadEmployee = false;
            this.cdfRef.markForCheck()
          })
        ).subscribe(data => {
        this.loadEmployee = false;
        this.listEmployee = data;
      }, error => {
        this.loadEmployee = false;
      })
    }
  }

  getTenHinhThuc(event) {
    if (event.cateName === 'Lựa chọn') {
      this.form.get('praiseFormName').setValue('');
    } else {
      this.form.get('praiseFormName').setValue(event.cateName);
    }
  }

  getEmployeeName(event) {
    this.form.get('employeeName').setValue(event.fullName);
  }
}

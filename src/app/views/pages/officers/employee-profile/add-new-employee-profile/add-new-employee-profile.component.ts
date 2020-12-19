import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Select, Store} from '@ngxs/store';
import {select, Store as StoreRx} from '@ngrx/store';
import {AppState} from '../../../../../core/reducers';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EmployeeProfileModel, EmployeeSalary} from '../../../../../core/service/model/Employee-profile';
import {NotiService} from '../../../../../core/service/service-model/notification.service';
import {EmployeeProfileService} from '../employee-profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {isEmpty, isEqual} from 'lodash';
import {Observable} from 'rxjs';
import {TenantInfo} from '../../../../../core/auth/_models';
import {currentTenant} from '../../../../../core/auth/_selectors/tenant.selectors';
import * as moment from 'moment';

@Component({
  selector: 'kt-add-new-employee-profile',
  templateUrl: './add-new-employee-profile.component.html',
  styleUrls: ['../profile/profile.component.scss'],
})
export class AddNewEmployeeProfileComponent implements OnInit {
  public infoForm: FormGroup;
  public qualificationForm: FormGroup;
  public salaryForm: FormGroup;
  public data = new EmployeeProfileModel();

  constructor(
    public domFile: DomSanitizer,
    private store: Store,
    private storeRx: StoreRx<AppState>,
    private fb: FormBuilder,
    private notiService: NotiService,
    public employeeProfileService: EmployeeProfileService,
    public router: Router,
    private route: ActivatedRoute,
  ) {

  }

  editID: string = null;
  editData: any;
  loading = false;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isCollapsed4 = true;
  isCollapsed5 = true;
  isCollapsed6 = true;
  submitStatus = false;
  tenantId: string = null;
  schoolInfo$: Observable<TenantInfo>
  listJobTitle = [];
  salaryData = new EmployeeSalary();

  public onSave() {
    this.submitStatus = true;
    if (this.infoForm.invalid) {
      return this.notiService.showNoti('Vui lòng điền đúng và đủ thông tin', 'error')
    }
    if (this.infoForm.value.fatherBirthDate?.length > 4) {
      return this.notiService.showNoti('Trường năm sinh của bố chỉ nhập tối đa 4 kí tự', 'error')
    }
    if (this.infoForm.value.motherBirthDate?.length > 4) {
      return this.notiService.showNoti('Trường năm sinh của mẹ chỉ nhập tối đa 4 kí tự', 'error')
    }
    if (this.infoForm.value.spouseBirthDate?.length > 4) {
      return this.notiService.showNoti('Trường năm sinh của Vợ / Chồng chỉ nhập tối đa 4 kí tự', 'error')
    }
    this.setFormControlName();
    const qualificationData = this.mappingQualificationData();
    const employeeSalary = this.mappingSalaryData();
    this.data = this.infoForm.value
    this.data.tenantCode = this.tenantId
    this.data.lstQualification = qualificationData;
    this.data.isRegularRefresher = this.qualificationForm.value.isRegularRefresher
    this.loading = true
    if (this.router.url.includes('edit-profile')) {
      console.log(this.salaryData)
      if (this.salaryData) {
        this.updateSalaryData(employeeSalary)
      } else {
        this.createSalaryData(employeeSalary)
      }
      this.employeeProfileService.updateEmployeeProfile(this.data, this.editID).pipe().subscribe(
        res => {
          console.log(res)
          this.router.navigateByUrl('/officers/employee-profile')
          this.notiService.updateSuccess();
          this.loading = false
        }, error => {
          this.loading = false
        }
      )
    } else {
      employeeSalary.isActive = true
      this.data.employeeSalary = employeeSalary;
      this.data.sectionPerWeek = this.data.sectionPerWeek ? parseInt(this.data.sectionPerWeek.toString(),10) : 0;
      this.employeeProfileService.createEmployeeProfile(this.data).pipe().subscribe(res => {
          this.notiService.createSuccess();
          this.router.navigateByUrl('/officers/employee-profile')
          this.loading = false
        }, error => {
          this.loading = false
        }
      )
    }
  }

  updateSalaryData(updateData) {
    const data = updateData;
    delete data.id;
    delete data.employeeSalaryAllwanceId
    data.employeeId = this.salaryData.employeeId
    this.employeeProfileService.updatetEmployeeSalaryInfo(
      this.salaryData.id,
      this.salaryData.employeeSalaryAllwanceId,
      data
    ).pipe().subscribe(res => {
      this.notiService.updateSuccess();
    })
  }

  createSalaryData(data) {
    const params = data;
    params.employeeId = this.route.snapshot.params.id
    this.employeeProfileService.createEmployeeSalaryInfo(params).pipe().subscribe(res => {
      console.log(res)
    })
  }

  getEditData() {
    if (this.router.url.includes('edit-profile')) {
      this.loading = true;
      this.editID = this.route.snapshot.params.id
      this.employeeProfileService.getEditData(this.editID).pipe().subscribe(res => {
        this.editData = res;
        this.getEducateEmployee(res.id);
        this.getSalaryEmployee(res);
        for (const key in this.editData) {
          if (key === 'fatherBirthDate' || key === 'motherBirthDate' || key === 'spouseBirthDate') {
            continue;
          }
          if (this.editData[key] && (key.toLowerCase().includes('date') || key.toLowerCase().includes('time'))) {
            this.editData[key] = new Date(this.editData[key])
          }
        }
        this.infoForm.patchValue(this.editData);
        this.loading = false;
      }, error => {
        this.loading = false;
      })
    }
  }

  mappingQualificationData() {
    const result = [];
    const form = this.qualificationForm.value
    for (const key in this.qualificationForm.value) {
      if (form[key] && key.includes('DM_') && !key.includes('_name')) {
        result.push({
          categoryCode: form[key],
          categoryName: form[key + '_name'],
          categoryTypeCode: key
        })
      }
    }
    return result;
  }

  mappingSalaryData() {
    if (!isEmpty(this.salaryForm.value)) {
      return this.salaryForm.value
    }
    return {};
  }

  setFormControlName() {
    if (this.infoForm.value.fullName) {
      const fullname = this.infoForm.value.fullName
      this.infoForm.get('name').setValue(fullname.split(' ').slice(-1).join(' '));
    }
  }

  isEmpty(data) {
    return isEmpty(data);
  }

  getEducateEmployee(id) {
    this.employeeProfileService.getEducateEmployee(id).pipe().subscribe(res => {
      if (res) {
        this.listJobTitle = res;
        const result = {}
        this.listJobTitle?.map(dt => {
          result[dt.categoryTypeCode] = dt.categoryCode
          this.qualificationForm.get(dt.categoryTypeCode).setValue(dt.categoryCode)
        })
      }
    })
  }

  getSalaryEmployee(data) {
    this.employeeProfileService.getEmployeeSalaryInfo(data.id).pipe().subscribe(res => {
        if (!res) return this.salaryData = null;
        this.salaryData = res;
        if (this.salaryData.appliedDate) {
          this.salaryData.appliedDate = new Date(this.salaryData.appliedDate)
        }
        this.salaryForm.patchValue(this.salaryData)
      }
    )
  }

  ngOnInit(): void {
    this.schoolInfo$ = this.storeRx.pipe(select(currentTenant))
    this.schoolInfo$.subscribe(data => {
      if (data) {
        this.tenantId = data.code
      }
    })
    this.infoForm = this.fb.group({})
    this.qualificationForm = this.fb.group({})
    this.salaryForm = this.fb.group({})
    this.getEditData();
  }
}

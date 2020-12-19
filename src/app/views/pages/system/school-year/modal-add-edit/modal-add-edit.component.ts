import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SchoolYear } from 'src/app/core/service/model/school-year.model';
import { NotiService } from 'src/app/core/service/service-model/notification.service';
import { SchoolYearService } from 'src/app/core/service/service-model/school-year.service';
import { locale } from '../../../../../core/_config/i18n/vi';
import * as moment from 'moment';

@Component({
  selector: 'kt-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.scss']
})
export class ModalAddEditComponent implements OnInit {
  VI_LANG = locale.data;
  @Input() title: any;
  @Input() selectedItem: any;
  @Input() actionType: any;
  submitted = false;
  startYear: any;
  endYear: any;
  currentYear = false;
  firstSemesterStartDate: Date = new Date();
  firstSemesterEndDate: Date = new Date();
  secondSemesterStartDate: Date = new Date();
  public today: Date = new Date();
  selectEndYear: any;
  addloading: boolean;
  form: FormGroup;
  createData: SchoolYear;
  isDisabled: boolean;
  schoolYear: any = {};

  constructor(private fb: FormBuilder,
    private _NgbActiveModal: NgbActiveModal,
    private schoolYearService: SchoolYearService,
    private notiService: NotiService) {
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      startYear: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(4)]),
      endYear: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(4)]),
      principalName: new FormControl('', [Validators.required]),
      firstSemesterStartDate: new FormControl('', [Validators.required]),
      firstSemesterEndDate: new FormControl('',),
      secondSemesterStartDate: new FormControl('',),
      secondSemesterEndDate: new FormControl('',),
    })
    this.loadEditForm()
  }

  public cancel() {
    this.activeModal.dismiss();
  }

  convertTime(time) {
    return moment(new Date(time)).format('yyyy/MM/DD');
  }

  save() {
    this.addloading = true;
    if (this.form.invalid) {
      if (this.form.value.firstSemesterStartDate > this.form.value.firstSemesterEndDate
        || this.form.value.secondSemesterStartDate > this.form.value.secondSemesterEndDate
        || this.form.value.secondSemesterStartDate < this.form.value.firstSemesterEndDate) {
        this.notiService.showNoti(this.VI_LANG.NOTIFICATION.PLEASE_ENTER_VALID_DATE,'warning')
      } else {
        this.notiService.showNoti(this.VI_LANG.NOTIFICATION.PLEASE_ENTER_FULL_INFO, 'error');
      }
      this.addloading = false;
    } else {
      this.schoolYear = {
        code: `${this.form.value.startYear}-${this.form.value.endYear}`,
        startDate: this.form.value.firstSemesterStartDate,
        endDate: this.form.value.secondSemesterEndDate ? this.form.value.secondSemesterEndDate : null,
        firstSemesterStartDate: this.convertTime(this.form.value.firstSemesterStartDate),
        firstSemesterEndDate: this.convertTime(this.form.value.firstSemesterEndDate),
        secondSemesterStartDate: this.convertTime(this.form.value.secondSemesterStartDate),
        secondSemesterEndDate: this.convertTime(this.form.value.secondSemesterEndDate),
        principalName: this.form.value.principalName,
        currentYear: this.selectedItem.currentYear,
        isActive: this.selectedItem.isActive
      }
      this.schoolYearService.updateSchoolYear(this.selectedItem.id, this.schoolYear).subscribe(() => {
        this.activeModal.close('Thành công');
        this.addloading = false;
      }, e => {
        this.addloading = false;
      }
      )
    }
  }


  trimSpace(formName: string) {
    if (formName) {
      this.form.get(formName).setValue(
        this.form.get(formName).value?.trim().replace(/(\s\s+| )/g, ' ')
      )
    }
  }

  secondSemesterStartDateChange(event) {
    this.secondSemesterStartDate = event;
  }

  firstSemesterStartDateChange(event) {
    this.firstSemesterStartDate = event
  }

  firstSemesterEndDateChange(event) {
    this.firstSemesterEndDate = event
  }

  loadEditForm() {
    this.firstSemesterStartDate = new Date(this.selectedItem.firstSemesterStartDate);
    this.firstSemesterEndDate = new Date(this.selectedItem.firstSemesterEndDate);
    this.secondSemesterStartDate = new Date(this.selectedItem.secondSemesterStartDate);
    this.form.get('startYear').setValue(this.selectedItem.code.slice(0, 4));
    this.form.get('endYear').setValue(this.selectedItem.code.slice(5));
    this.form.get('principalName').setValue(this.selectedItem.principalName)
    this.form.get('firstSemesterStartDate').setValue(new Date(this.selectedItem.firstSemesterStartDate))
    this.form.get('firstSemesterEndDate').setValue(this.selectedItem.firstSemesterEndDate ? new Date(this.selectedItem.firstSemesterEndDate) : null)
    this.form.get('secondSemesterStartDate').setValue(this.selectedItem.secondSemesterStartDate ? new Date(this.selectedItem.secondSemesterStartDate) : null)
    this.form.get('secondSemesterEndDate').setValue(this.selectedItem.secondSemesterEndDate ? new Date(this.selectedItem.secondSemesterEndDate) : null)
  }
}





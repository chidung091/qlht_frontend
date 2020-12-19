import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Department} from '../../../../../core/service/model/department.model';
import {Select} from '@ngxs/store';
import {ManagermentState} from '../../../../../core/service/states/managerment.state';
import {ManagementModel} from '../../../../../core/service/model/management.model';
import {ManagermentService} from '../../../../../core/service/service-model/managerment.service';
import {ItemManagerment} from '../../../../../core/service/model/item-managerment.model';
import {locale} from '../../../../../core/_config/i18n/vi';


@Component({
  selector: 'kt-detail',
  templateUrl: './modalUpdateSchoolFaculty.component.html',
  styleUrls: ['./modalUpdateSchoolFaculty.component.scss']
})
@NgModule()
export class ModalUpdateDepartmentComponent implements OnInit, AfterViewInit {
  VI_LANG = locale.data;
  @Input() loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @Input() deparmentx: Department;
  @Output() deparmentout = new EventEmitter();

  @ViewChild('faculityName') uid: ElementRef;
  public dataList: ManagementModel[] = [];
  public dataListManagerment: ManagementModel[] = [];
  public indexOfManagermentName = 0;
  public bool = 0;
  public listManagerment: Observable<ItemManagerment>;
  public data: any = {
    tenBoMon: '',
    hoTenCanBoQuanLy: '',
    ghiChu: '',
    canBoQuanLyId: '',
    id: ''
  }
  public okLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public boolLoad = true;

  @Select(ManagermentState.manager) manager$: Observable<ManagementModel[]>

  public form: FormGroup;

  constructor(private managermentService: ManagermentService) {
    this.form = new FormGroup({
      tenBoMon: new FormControl(this.data.tenBoMon, [Validators.required, Validators.maxLength(50),
        Validators.pattern('[^~`!@#$%^&*()_=[{}\\]|:;\\\\"\'<,>.?/]*')]),
      hoTenCanBoQuanLy: new FormControl(this.data.hoTenCanBoQuanLy, [Validators.maxLength(100)]),
      ghiChu: new FormControl(this.data.ghiChu, [Validators.maxLength(300)]),
      canBoQuanLyId: new FormControl(this.data.canBoQuanLyId, []),
      id: new FormControl(this.data.id, [])
    });
  }

  ngOnInit(): void {
    if (this.deparmentx === undefined) {
      this.deparmentx = new Department();
      // this.statusInput = false;
    }
    this.form.patchValue({
      tenBoMon: this.deparmentx.facultyName,
      hoTenCanBoQuanLy: this.deparmentx.employeeManagementName,
      ghiChu: this.deparmentx.note,
      canBoQuanLyId: this.deparmentx.canBoQuanLyId,
      id: this.deparmentx.id
    })
    if (this.form.value.canBoQuanLyId) {
      this.bool = 1;
    }
    // this.listManagerment = this.managermentService.getManagerments();
    // this.managermentService.getManagerments().subscribe(data => {
    //   if (data) {
    //     this.dataList = data.items;
    //     this.dataListManagerment = this.dataList;
    //     this.okLoading.next(false);
    //   }
    // }, error => {
    //   this.okLoading.next(false);
    // })
    this.changeDeparment();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.uid.nativeElement.select();
      this.uid.nativeElement.focus();
    }, 10)
  }

  changeDeparment() {
    this.deparmentout.emit(this.form);
  }

  findManagermentBykey(value) {
    if (value.length > 0) {
      this.dataListManagerment = [];
      this.dataList.forEach(item => {
        if (item.fullName.toLowerCase().indexOf(value.trim().toLowerCase()) !== -1) {
          this.dataListManagerment.push(item);
        }
      });
    }
  }

  checkValue() {
    const index = this.dataList.findIndex(item => item.fullName === this.form.value.hoTenCanBoQuanLy);
    if (index === -1 || this.form.value.canBoQuanLyId === undefined || this.bool === 0) {
      this.form.patchValue({
        canBoQuanLyId: undefined,
        hoTenCanBoQuanLy: ''
      });
    }
    this.deparmentout.emit(this.form);
  }

  chooseValue(value: any) {
    this.form.patchValue({
      hoTenCanBoQuanLy: value.hoTen,
      canBoQuanLyId: value.id
    });
    this.bool = 1;
    this.indexOfManagermentName = this.dataListManagerment.findIndex(item => item.id === value.id);
  }

  formatvalue() {
    if (this.form.value.tenBoMon !== undefined) {
      const formatNameSchoolFaculty = this.form.value.tenBoMon.replace(/(\s\s+| )/g, ' ').trim();
      this.form.patchValue({
        tenBoMon: formatNameSchoolFaculty
      });
      this.deparmentout.emit(this.form);
    }
    if (this.form.value.hoTenCanBoQuanLy !== undefined) {
      const formatHoTenCanBo = this.form.value.hoTenCanBoQuanLy.replace(/(\s\s+| )/g, ' ').trim();
      this.form.patchValue({
        hoTenCanBoQuanLy: formatHoTenCanBo
      });
      this.deparmentout.emit(this.form);
    }
  }

  keyUp(value) {
    if (value.key === 'ArrowUp' && this.indexOfManagermentName > 0) {
      this.indexOfManagermentName = this.indexOfManagermentName - 1;
    } else if (value.key === 'ArrowDown' && this.indexOfManagermentName < (this.dataListManagerment.length - 1)) {
      this.indexOfManagermentName = this.indexOfManagermentName + 1;
    } else if (value.key === 'Enter') {
      this.form.patchValue({
        hoTenCanBoQuanLy: this.dataListManagerment[this.indexOfManagermentName].fullName,
        canBoQuanLyId: this.dataListManagerment[this.indexOfManagermentName].id
      });
      this.bool = 1;
      this.deparmentout.emit(this.form);
      this.indexOfManagermentName = 0;
    } else if (value.key !== 'Tab') {
      this.bool = 0;
    }
  }

  formatNote() {
    let note = ''
    if (this.form.value.ghiChu) {
      note = this.form.value.ghiChu.trim();
    }
    this.form.patchValue({
      ghiChu: note
    })
  }
}

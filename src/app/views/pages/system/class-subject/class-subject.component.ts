import { Component, OnDestroy, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { GridDataResult, SelectableSettings } from '@progress/kendo-angular-grid';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { SubjectState } from '../../../../core/service/states/subject.state';
import { GetSubjectModel, SaveSubjectModel, SubjectModel } from '../../../../core/service/model/subject.model';
import { SubjectService } from '../../../../core/service/service-model/subject.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotiService } from '../../../../core/service/service-model/notification.service';
import { Policies } from '../../../../core/_constants/policy.constants';
import { locale } from '../../../../core/_config/i18n/vi';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'kt-subject',
  templateUrl: './class-subject.component.html',
  styleUrls: ['./class-subject.component.scss']
})
export class ClassSubjectComponent implements OnInit, OnDestroy {
  @ViewChild('subjectType') subjectType: DropDownListComponent;
  VI_LANG = locale.data;
  classSubjectEdit: string = Policies.SYSTEMMANAGEMENT_CLASSSUBJECT_EDIT;
  listDataSubject: SubjectModel[] = [];
  subjects: SubjectModel[] = [];
  fullSubjects: SubjectModel[] = [];
  subjectSave: SaveSubjectModel;
  checkVal = null;
  public opened = false;
  destroy$ = new Subject<void>();
  tvtValue: string;
  tenVietTat: string;
  gradeLevelCode: string;
  gradeLevel: string;
  status: number;
  schoolYearCode: string;
  currentYearCheck: boolean;
  schoolLevelCode: string;
  namHocId: string;
  class: {
    classId: string,
    className: string
  };
  getSubjectModel: GetSubjectModel;

  listTypeOfSubject = [
    { name: 'Bắt buộc', value: 1 },
    { name: 'Tự chọn', value: 2 }
  ]

  listSubjectType = [
    { name: 'Tính điểm', value: 1 },
    { name: 'Nhận xét', value: 2 }
  ]

  activeStatus = [
    { name: 'Đang hoạt động', value: 1 },
    { name: 'Ngừng hoạt động', value: 2 },
  ]

  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  chooseSubject: number = null;
  totalSubject: number;

  selectTableSetting: SelectableSettings = {
    checkboxOnly: true,
    mode: 'multiple'
  }

  pageSizes: Array<number> = [10, 20];
  _pageSize = 5;

  @Select(SubjectState.getAllSubject) listSubject$: Observable<SubjectModel[]>;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public gridView: GridDataResult;
  nullDataDisable = false;
  checkBoxStatus = false;
  successOpen = false;
  nullClassDisable: any;

  constructor(private subjectService: SubjectService,
    private renderer: Renderer2,
    private notiService: NotiService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSubjectByLevel(schoolLevelCode: string) {
    this.getSubjectModel = {
      schoolLevelCode: schoolLevelCode, skipCount: 0, maxResultCount: 100
    }
    this.subjectService.getSubjectByLevel(this.getSubjectModel).subscribe(subject => {
      this.loadDataSubject(0, subject.items, this.currentYearCheck);
      this.loading$.next(false);
      this.nullDataDisable = true;
      this.checkBoxStatus = true;
      this.nullClassDisable = true;
    }, () => {
      this.loading$.next(false);
      this.nullDataDisable = true;
      this.checkBoxStatus = true;
      this.nullClassDisable = true;
    })
  }

  changeChooseSubject(dataItem, rowIndex: number) {
    const index = this.subjects.findIndex(d => d.subjectId === dataItem.subjectId);
    const disabID = document.getElementsByClassName('id' + rowIndex);
    const dropId = document.getElementsByClassName('drop' + rowIndex);
    if (index === -1) {
      if (disabID !== null) {
        Array.prototype.forEach.call(disabID, el => {
          (el as HTMLInputElement).removeAttribute('disabled');
        });
      }
      if (dropId !== null) {
        Array.prototype.forEach.call(dropId, el => {
          (el as HTMLInputElement).removeAttribute('disabled');
        });
      }
      this.chooseSubject += 1;
      this.subjects.push(dataItem);
    } else {
      // tslint:disable-next-line:max-line-length
      if (disabID !== null) Array.prototype.forEach.call(disabID, el => (el as HTMLInputElement).setAttribute('disabled', 'disabled'));
      if (dropId !== null) Array.prototype.forEach.call(dropId, el => (el as HTMLInputElement).setAttribute('disabled', 'disabled'));
      this.subjects.splice(index, 1);
      this.chooseSubject -= 1;
    }
    this.checknullPushList();
  }

  checknullPushList() {
    if (this.subjects.length === 0 && this.listDataSubject.filter(data => data.id !== null).length === 0) this.nullDataDisable = true;
    else this.nullDataDisable = false;
  }

  submitSearch(value: any) {
    this.nullDataDisable = true;
    this.listDataSubject = [];
    this.loading$.next(true);
    if (value.classId === null || value.schoolYearCode === null) {
      this.loadSubjectByLevel(value.schoolLevelCode);
    } else {
      this.nullClassDisable = false;
      this.gradeLevelCode = value.gradeLevelCode;
      this.gradeLevel = value.gradeLevel;
      this.schoolLevelCode = value.schoolLevelCode;
      this.class = {
        classId: value.classId,
        className: value.className
      };
      this.getSubjectModel = {
        gradeLevelCode: value.gradeLevelCode,
        classId: value.classId,
        schoolYearId: value.schoolYearId,
        schoolLevelCode: value.schoolLevelCode,
        skipCount: 0,
        maxResultCount: 100
      }
      this.status = value.trangThai;
      this.schoolYearCode = value.schoolYearCode;
      this.schoolLevelCode = value.schoolLevelCode;
      this.currentYearCheck = value.currentYearCheck;
      this.subjectService.getSubjectByClass(this.getSubjectModel).subscribe(dataSubject => {
        this.loadDataSubject(value.trangThai, dataSubject.items, value.currentYearCheck);
      }, () => {
        this.listDataSubject = [];
        this.nullDataDisable = true;
        setTimeout(() => {
          this.loading$.next(false);
        }, 400);
      });
    }
  }

  submitClass(value: any) {
    if (value !== this.class.className) {
      this.nullClassDisable = true;
      this.nullDataDisable = true;
      this.checkBoxStatus = true;
    }
  }

  loadDataSubject(status: number, dataSubject: SubjectModel[], currentYearCheck: boolean) {
    this.isLoading$.next(false);
    this.fullSubjects = [];
    this.subjects = [];
    this.loadStatus(status, dataSubject);
    if (dataSubject) {
      dataSubject.forEach(s => {
        if (s.id !== null) {
          if (this.subjects.filter(sub => sub.subjectId === s.subjectId).length === 0) {
            this.subjects.push(s);
          }
        }
      });
      dataSubject.forEach(sub => {
        if (this.fullSubjects.filter(s => s.subjectId === sub.subjectId).length === 0) {
          this.fullSubjects.push(sub);
        }
      });
      this.checkYear(currentYearCheck);
      if (this.listDataSubject.length === 0 || this.subjects.length === 0) {
        this.nullDataDisable = true;
      }
      this.listDataSubject.forEach((s, index) => {
        setTimeout(() => {
          this.loadCheckbox(s, index);
        }, 100);
      });
    }
    ;
    this.loading$.next(false);
    this.isLoading$.next(true);
  }

  checkYear(currentYearCheck: boolean) {
    this.checkBoxStatus = !currentYearCheck;
    this.nullDataDisable = !currentYearCheck;
  }

  loadCheckbox(s: SubjectModel, index: number) {
    const e2 = document.getElementById(s.subjectId);
    const disabID = document.getElementsByClassName('id' + index);
    const dropId = document.getElementsByClassName('drop' + index);
    if (s.id !== null) {
      if (e2 !== null) {
        // tslint:disable-next-line:max-line-length
        if (disabID !== null) Array.prototype.forEach.call(disabID, el => (el as HTMLInputElement).removeAttribute('disabled'));
        if (dropId !== null) Array.prototype.forEach.call(dropId, el => (el as HTMLInputElement).removeAttribute('disabled'));
        (e2 as HTMLInputElement).checked = true;
      }
    } else {
      if (e2 !== null) {
        // tslint:disable-next-line:max-line-length
        if (disabID !== null) Array.prototype.forEach.call(disabID, el => (el as HTMLInputElement).setAttribute('disabled', 'disabled'));
        if (dropId !== null) Array.prototype.forEach.call(dropId, el => (el as HTMLInputElement).setAttribute('disabled', 'disabled'));
        (e2 as HTMLInputElement).checked = false;
      }
    }
  }

  loadStatus(status: number, dataSubject: SubjectModel[]) {
    dataSubject.forEach(sub => {
      if (this.listDataSubject.filter(s => s.subjectId === sub.subjectId).length === 0) {
        if (status === 0 || !status) {
          this.listDataSubject.push(sub);
          this.totalSubject = this.listDataSubject.length;
          this.chooseSubject = this.listDataSubject.filter(s => s.id !== null).length;
        } else if (status === 1) {
          this.listDataSubject.push(sub);
          this.listDataSubject = this.listDataSubject.filter(s => s.id !== null);
          this.totalSubject = this.listDataSubject.filter(s => s.id !== null).length;
          this.chooseSubject = this.listDataSubject.filter(s => s.id !== null).length;
        } else if (status === 2) {
          this.listDataSubject.push(sub);
          this.listDataSubject = this.listDataSubject.filter(s => s.id === null);
          this.totalSubject = this.listDataSubject.filter(s => s.id === null).length;
          this.chooseSubject = 0;
        }
      }
    });
  }

  saveOne() {
    this.createSaveSubject(false);
  }


  saveAll() {
    this.createSaveSubject(true);
  }

  createSaveSubject(mode: boolean) {
    // tslint:disable-next-line:no-unused-expression
    this.fullSubjects.forEach((elem1) => {
      elem1;
      // tslint:disable-next-line:no-unused-expression no-shadowed-variable
      this.subjects.forEach((elem2, index1) => {
        elem2;
        if (elem1.subjectId === elem2.subjectId) {
          this.subjects.splice(index1, 1);
          elem1.gradeLevelCode = this.gradeLevelCode;
          elem1.gradeLevel = this.gradeLevel;
          elem1.schoolYearId = this.getSubjectModel.schoolYearId;
          elem1.schoolYearCode = this.schoolYearCode;
          elem1.isActive = true;
          this.subjects.push(elem1);
        }
      });
    });
    // true: áp dụng toàn khối
    // false: áp dụng 1 lớp
    this.subjectSave = {
      classId: this.class.classId,
      gradeLevelCode: this.getSubjectModel.gradeLevelCode,
      gradeLevel: this.gradeLevel,
      className: this.class.className,
      schoolYearId: this.getSubjectModel.schoolYearId,
      schoolYearCode: this.schoolYearCode,
      isApplyGradeLevel: mode,
      schoolLevelCode: this.getSubjectModel.schoolLevelCode,
      subjects: this.subjects
    }
    this.validateSubject(this.subjects);
    if (this.checkVal !== 1 || this.subjects.length === 0) {
      this.loading$.next(true);
      this.listDataSubject = [];
      this.subjectService.saveSubject(this.subjectSave).subscribe(data => {
        if (data.totalCount !== 0) {
          this.subjectService.getSubjectByClass(this.getSubjectModel).subscribe(dataSubject => {
            this.loadDataSubject(this.status, dataSubject.items, this.currentYearCheck);
            this.successOpen = true;
            setTimeout(() => {
              document.getElementById('closeSuccess').focus();
            }, 50);
          }, () => {
            this.listDataSubject = [];
            this.nullDataDisable = true;
            setTimeout(() => {
              this.loading$.next(false);
            }, 400);
          });
        }
      }, () => {
        this.loading$.next(false);
        this.loadSubjectByLevel(this.schoolLevelCode);
      });
    }
  }

  loaimonChange(event, dataItem) {
    this.fullSubjects.forEach((subject, index) => {
      if (subject.subjectId === dataItem.subjectId) {
        // this.fullSubjects.splice(index, 1);
        subject = {
          id: subject.id,
          gradeLevelCode: subject.gradeLevelCode,
          gradeLevel: subject.gradeLevel,
          subjectId: subject.subjectId,
          subjectName: subject.subjectName,
          acronymName: subject.acronymName,
          subjectType: event.value,
          subjectSpecies: subject.subjectSpecies,
          numberLessionSemester1: subject.numberLessionSemester1,
          numberLessionSemester2: subject.numberLessionSemester2,
          schoolYearId: this.getSubjectModel.schoolYearId,
          schoolYearCode: this.schoolYearCode,
          isActive: subject.isActive
        };
        this.fullSubjects[index] = subject;
        // this.fullSubjects.push(subject);
      }
    })
  }

  kieumonChange(event, dataItem) {
    this.fullSubjects.forEach((subject, index) => {
      if (subject.subjectId === dataItem.subjectId) {
        // this.fullSubjects.splice(index, 1);
        subject = {
          id: subject.id,
          gradeLevelCode: subject.gradeLevelCode,
          gradeLevel: subject.gradeLevel,
          subjectId: subject.subjectId,
          subjectName: subject.subjectName,
          acronymName: subject.acronymName,
          subjectType: subject.subjectType,
          subjectSpecies: event.value,
          numberLessionSemester1: subject.numberLessionSemester1,
          numberLessionSemester2: subject.numberLessionSemester2,
          schoolYearId: this.getSubjectModel.schoolYearId,
          schoolYearCode: this.schoolYearCode,
          isActive: subject.isActive
        };
        this.fullSubjects[index] = subject;
        // this.fullSubjects.push(subject);
      }
    })
  }

  hk1Change(event, dataItem) {
    if (event === '') event = null; else event = event;
    this.fullSubjects.forEach((subject, index) => {
      if (subject.subjectId === dataItem.subjectId) {
        // this.fullSubjects.splice(index, 1);
        subject = {
          id: subject.id,
          gradeLevelCode: subject.gradeLevelCode,
          gradeLevel: subject.gradeLevel,
          subjectId: subject.subjectId,
          subjectName: subject.subjectName,
          acronymName: subject.acronymName,
          subjectType: subject.subjectType,
          subjectSpecies: subject.subjectSpecies,
          numberLessionSemester1: event,
          numberLessionSemester2: subject.numberLessionSemester2,
          schoolYearId: this.getSubjectModel.schoolYearId,
          schoolYearCode: this.schoolYearCode,
          isActive: subject.isActive
        };
        this.fullSubjects[index] = subject;
        // this.fullSubjects.push(subject);
      }
    })
  }

  hk2Change(event, dataItem) {
    if (event === '') event = null; else event = event;
    this.fullSubjects.forEach((subject, index) => {
      if (subject.subjectId === dataItem.subjectId) {
        // this.fullSubjects.splice(index, 1);
        subject = {
          id: subject.id,
          gradeLevelCode: subject.gradeLevelCode,
          gradeLevel: subject.gradeLevel,
          subjectId: subject.subjectId,
          subjectName: subject.subjectName,
          acronymName: subject.acronymName,
          subjectType: subject.subjectType,
          subjectSpecies: subject.subjectSpecies,
          numberLessionSemester1: subject.numberLessionSemester1,
          numberLessionSemester2: event,
          schoolYearId: this.getSubjectModel.schoolYearId,
          schoolYearCode: this.schoolYearCode,
          isActive: subject.isActive
        };
        this.fullSubjects[index] = subject;
        // this.fullSubjects.push(subject);
      }
    })
  }

  validateSubject(subjects: SubjectModel[]) {
    this.checkVal = null;
    let check = true;
    subjects.forEach((data, index) => {
      if (this.checkVal === null) {
        if (data.subjectType === null) {
          this.checkVal = 1;
          this.notiService.showNoti('Loại môn ' + data.subjectName + ' không được để trống!', 'error');
        } else if (data.subjectSpecies === null) {
          this.checkVal = 1;
          this.notiService.showNoti('Kiểu môn ' + data.subjectName + ' không được để trống!', 'error');
        } else if (data.numberLessionSemester1 === null) {
          this.checkVal = 1;
          const element = this.renderer.selectRootElement('.numberLessionSemester1' + index);
          element.focus();
          this.notiService.showNoti('Số tiết/tuần HK1 không được để trống!', 'error');
        } else if (data.numberLessionSemester2 === null) {
          this.checkVal = 1;
          const element = this.renderer.selectRootElement('.numberLessionSemester2' + index);
          element.focus();
          this.notiService.showNoti('Số tiết/tuần HK2 không được để trống!', 'error');
        }
      }
    })
  }

  public close(status) {
    if (status === 'yes') this.createSaveSubject(true);
    this.opened = false;
    this.successOpen = false;
  }

  public open() {
    this.opened = true;
    setTimeout(() => {
      document.getElementById('submitSaveAll').focus();
    }, 50);
  }

  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}

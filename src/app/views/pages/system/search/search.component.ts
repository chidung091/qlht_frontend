import { Year } from './../../../../core/year/_models/year.model';
import { SchoolLevel } from 'src/app/core/auth/_models';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ClassroomModel } from '../../../../core/service/model/classroom.model';
import { GradeModel } from '../../../../core/service/model/subject.model';
import { SmasContextService } from '../../../../core/_base/layout';
import { takeUntil } from 'rxjs/operators';
import { ClassroomService } from '../../../../core/service/service-model/classroom.service';
import { CatalogService } from '../../../../core/service/service-model/catalog.service';
import { SchoolYear } from '../../../../core/service/model/school-year.model';
import { SmasConText } from '../../../../core/_base/layout/models/smas-context.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'system-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() component: string;
  @Output() submitSearch = new EventEmitter();
  @Output() submitClass = new EventEmitter();
  listClassProflies: ClassroomModel[];
  class: ClassroomModel;
  getKhoi: any;
  checkStatusButton = false;
  @ViewChild('focusContent') el: any;
  classrooms: ClassroomModel[];
  grades: GradeModel[];
  schoolLevelCode: string;
  smasContextModel: SmasConText;

  constructor(
    private classroomService: ClassroomService,
    private catalogService: CatalogService,
    private smasContextService: SmasContextService
  ) {
    this.smasContextService.onConfigUpdated$.subscribe((ctx) => {
      this.smasContextModel = this.smasContextService.getSmasConText();
      if (this.smasContextModel.level.schoolLevelCode !== this.searchValue.schoolLevelCode) {
        this.loadGrade(this.smasContextModel.level);
      } else if (this.smasContextModel.year.id !== this.searchValue.schoolYearId) {
        this.setNam(this.smasContextModel.year);
      }
    });
    this.smasContextModel = this.smasContextService.getSmasConText();
  }

  destroy$ = new Subject<void>();

  status: Status[] = [
    { name: 'Tất cả', value: 0 },
    { name: 'Đã khai báo môn học', value: 1 },
    { name: 'Chưa khai báo môn học', value: 2 },
  ];
  classroomtest: ClassroomModel[];
  statusView: Status[] = this.status;
  defaultLevelSchool = { cateName: 'Lựa chọn', id: null };
  defaultClass = { tenLop: 'Lựa chọn' };
  classValue: string;
  searchValue = {
    gradeLevelCode: '',
    gradeLevel: '',
    classId: '',
    className: '',
    trangThai: '',
    schoolYearCode: '',
    schoolYearId: '',
    schoolLevelCode: '',
    currentYearCheck: true
  };
  public defaultClassroom: { className: string; id: null } = {
    className: 'Lựa chọn',
    id: null,
  };
  public defaultStatus: Status = { name: 'Tất cả', value: 0 };
  selectedClassroom: any;
  selectedStatus: any;
  isCollapsed = true;
  classDisable = false;
  levelDisable = false;
  public lLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public kLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  selectedLevelSchool: any;
  statusDisable = true;
  namHocModel: SchoolYear[];
  defaultNamHoc: SchoolYear;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.smasContextModel = this.smasContextService.getSmasConText();
    this.setNam(this.smasContextModel.year);
    this.loadGrade(this.smasContextModel.level);
  }

  ngAfterViewInit() {
    // this.el.nativeElement.focus();
  }

  setNam(year: Year) {
      this.statusView = [];
      this.searchValue.trangThai = null;
      this.selectedLevelSchool = this.defaultLevelSchool;
      this.selectedClassroom = this.defaultClassroom;
      this.classDisable = true;
      this.statusDisable = true;
      this.searchValue.classId = null;
      if (this.smasContextModel.year) {
        this.searchValue.schoolYearCode = this.smasContextModel.year.code;
        this.searchValue.schoolYearId = this.smasContextModel.year.id;
        this.searchValue.currentYearCheck = this.smasContextModel.year.currentYear;
      } else {
        this.searchValue.schoolYearCode = null;
      }
      setTimeout(() => {
        this.setDefaultStatus();
      }, 100);
      if (this.searchValue.schoolLevelCode !== '') this.submit();
  }
  setDefaultStatus() {
    this.statusView = this.status;
    this.selectedStatus = this.defaultStatus;
  }

  loadGrade(schoolLevel: SchoolLevel) {
      this.searchValue.classId = null;
      this.statusView = [];
      this.kLoading$.next(true);
      if (this.smasContextModel.level) {
        this.schoolLevelCode = this.smasContextModel.level.schoolLevelCode;
        this.searchValue.schoolLevelCode = this.smasContextModel.level.schoolLevelCode;
      } else {
        this.searchValue.schoolLevelCode = JSON.parse(
          sessionStorage.getItem('currentLevel')
        ).schoolLevelCode;
        this.schoolLevelCode = JSON.parse(
          sessionStorage.getItem('currentLevel')
        ).schoolLevelCode;
      }
      this.catalogService
        .getCatalogTwo('DM_KHOI', this.smasContextModel.level.schoolLevelCode)
        .subscribe(
          (grade) => {
            if (grade.length === 0) {
              this.selectedLevelSchool = this.defaultLevelSchool;
              this.selectedClassroom = this.defaultClassroom;
              this.levelDisable = true;
            } else {
              this.levelDisable = false;
              this.grades = grade;
              this.selectedLevelSchool = this.defaultLevelSchool;
              this.selectedClassroom = this.defaultClassroom;
              this.classDisable = true;
              this.statusDisable = true;
            }
            this.setDefaultStatus();
            this.kLoading$.next(false);
          },
          () => {
            this.kLoading$.next(false);
            this.selectedLevelSchool = this.defaultLevelSchool;
            this.selectedClassroom = this.defaultClassroom;
            this.classDisable = true;
            this.levelDisable = true;
            this.statusDisable = true;
          }
        );
      this.submit();
      // setTimeout(() => this.el.nativeElement.focus());
  }

  submit() {
    this.submitSearch.emit(this.searchValue);
    // console.log(this.searchValue);
  }

  submitCls() {
    this.submitClass.emit(this.classValue);
  }

  selectionKhoi(value) {
    this.statusView = [];
    this.lLoading$.next(true);
    this.searchValue.classId = null;
    this.searchValue.trangThai = null;
    if (value.id == null) {
      this.selectedClassroom = this.defaultClassroom;
      this.lLoading$.next(false);
      this.classDisable = true;
    } else {
      this.classroomService
        .GetClassByGradeAndYear(value.cateCode, this.searchValue.schoolYearId)
        .subscribe((data) => {
          this.setDefaultStatus();
          if (data.length === 0) {
            this.statusDisable = true;
            this.classDisable = true;
            this.searchValue.classId = null;
            this.selectedClassroom = this.defaultClassroom;
            this.submit();
          } else {
            this.selectedClassroom = data[0];
            this.searchValue.classId = data[0].id;
            this.searchValue.className = data[0].className;
            this.classDisable = false;
            this.classrooms = data;
            this.statusDisable = false;
            setTimeout(() => this.el.nativeElement.focus());
          }
          this.setDefaultStatus();
          this.lLoading$.next(false);
        });
    }
    setTimeout(() => this.el.nativeElement.focus());
    this.listClassProflies = [];
    this.searchValue.gradeLevelCode = value.cateCode;
    this.searchValue.gradeLevel = value.cateName;
  }

  selectionLop(lop) {
    this.searchValue.classId = lop.id;
    this.searchValue.className = lop.className;
    this.classValue = lop.id;
    this.submitCls();
    this.el.nativeElement.focus();
  }

  selectionStatus(event: any) {
    this.el.nativeElement.focus();
    this.searchValue.trangThai = event.value;
  }

  focusSearch() {
    this.el.nativeElement.focus();
  }
}

export interface Status {
  name: string;
  value: number;
}

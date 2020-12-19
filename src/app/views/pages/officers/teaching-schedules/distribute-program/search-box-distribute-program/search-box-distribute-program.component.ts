import {Component, OnInit, ViewChild} from '@angular/core';
import {GradeModel, SubjectModel} from '../../../../../../core/service/model/subject.model';
import {Store} from '@ngxs/store';
import {ClassroomModel} from '../../../../../../core/service/model/classroom.model';
import {SubjectService} from '../../../../../../core/service/service-model/subject.service';
import {ClassroomService} from '../../../../../../core/service/service-model/classroom.service';
import {DropDownListComponent} from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'kt-search-box-distribute-program',
  templateUrl: './search-box-distribute-program.component.html',
  styleUrls: ['./search-box-distribute-program.component.scss']
})
export class SearchBoxDistributeProgramComponent implements OnInit {

  // searchValue = {
  //   mon: '',
  //   lop: '',
  //   tenlop: '',
  //   trangThai: ''
  // };

  constructor(private store: Store, private subjectService: SubjectService, private classroomService: ClassroomService) { }

  openModalSearchBody = true; idSelectedGrade: string; idselected: string;

  @ViewChild('dropDownListClass') dropdownListClass: DropDownListComponent;

  selectedGrade: GradeModel; selectedSubject: SubjectModel; selectedClass: ClassroomModel;

  listAllSubject: Array<SubjectModel>=[]; listAllGrade: Array<GradeModel>=[]; listClassByGrade: Array<ClassroomModel>=[];

  defaultPhanMon:{ id: string;value:string;} = {id: null, value: '[Chính]'};

  defaultTuan:{ id: string;value:string;} = {id: null, value: 'Tất cả'};

  ngOnInit(): void {
    this.getAllSubject(); this.getAllGrade(); this.getClassroomByGrade();
    this.selectedClass = this.listClassByGrade[0];
  }

  getAllSubject() {
    this.subjectService.getAllSubject().subscribe(data => {
      this.listAllSubject = data;
      this.selectedSubject = data[0];
    })
  }

  getAllGrade() {
    this.subjectService.getAllGrade().subscribe(data => {
      this.listAllGrade = data;
      this.selectedGrade = this.listAllGrade[0];
      this.idSelectedGrade = this.selectedGrade.id;
    })
  }

  getClassroomByGrade() {
    this.classroomService.getClassByGrade(this.idSelectedGrade).subscribe(data => {
      this.listClassByGrade = data;
      this.selectedClass = this.listClassByGrade[0];
    });
  }

  changeValueGrade(value) {
    this.idSelectedGrade = value.id;
    this.getClassroomByGrade();
    this.dropdownListClass.reset();
    this.selectedClass = this.listClassByGrade[0];
  }
}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {GradeModel, SubjectModel} from '../../../../../../core/service/model/subject.model';
import {SubjectService} from '../../../../../../core/service/service-model/subject.service';

@Component({
  selector: 'kt-search-box-divisive-configuaration',
  templateUrl: './search-box-divisive-configuaration.component.html',
  styleUrls: ['./search-box-divisive-configuaration.component.scss']
})
export class SearchBoxDivisiveConfiguarationComponent implements OnInit {

  openModalSearchBody = true; valueSubjectSelected: SubjectModel; valueGradeSelected: GradeModel; searchValue: any;

  listAllSubject: SubjectModel[]; listAllGradeLevel: GradeModel[]; isLoadingDropdownSubject = true; isLoadingDropdownGrade = true;

  defaultGradeLevel: GradeModel = {id: null, maLoaiDanhMuc: null, tenDanhMuc: 'Tất cả'};

  valueChooseGrade : any = ''; valueChooseSubject: any = '';

  defaultSubject: { id: null; tenMon: string } = { id: null, tenMon: 'Tất cả'};

  @Output() valueEmitter = new EventEmitter();

  constructor(private subjectService: SubjectService) {
  }

  ngOnInit(): void {
    this.getListAllGradeLevel();
    this.getListAllSubject();
  }

  // Lấy danh sách khối
  getListAllGradeLevel() {
    this.subjectService.getAllGrade().subscribe(data => {
      this.listAllGradeLevel = data;
      this.isLoadingDropdownGrade = false;
    })
  }

  // Lấy danh sách môn học
  getListAllSubject(){
    this.subjectService.getAllSubject().subscribe(data => {
      this.listAllSubject = data;
      this.isLoadingDropdownSubject = false;
    })
  }

  valueSearchGrade() {
    this.valueChooseGrade = this.valueGradeSelected.id;
  }

  valueSearchSubject() {
    this.valueChooseSubject = this.valueSubjectSelected.id;
  }

  submitSearch() {
    this.searchValue = {
      idKhoi: this.valueChooseGrade,
      idMonHoc: this.valueChooseSubject
    }
    this.valueEmitter.emit(this.searchValue);
  }
}


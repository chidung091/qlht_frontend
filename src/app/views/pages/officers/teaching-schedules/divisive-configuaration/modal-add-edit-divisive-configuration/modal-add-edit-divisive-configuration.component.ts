import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {GradeModel, SubjectModel} from '../../../../../../core/service/model/subject.model';
import {SubjectService} from '../../../../../../core/service/service-model/subject.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-modal-add-edit-divisive-configuration',
  templateUrl: './modal-add-edit-divisive-configuration.component.html',
  styleUrls: ['./modal-add-edit-divisive-configuration.component.scss']
})
export class ModalAddEditDivisiveConfigurationComponent implements OnInit{

  listAllSubject: SubjectModel[]; listAllGrade: GradeModel[];

  loadingSubject = true; loadingCheckBoxGrade = true;

  public listCheckBox : GradeModel[] = [];

  defaultSubject:{ id: string;tenMon:string;maCapHoc:string,hoatDong:string} = {id: null,tenMon: 'Lựa chọn',maCapHoc: null,hoatDong: null};

  constructor(private subjectService: SubjectService,
              private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAllSubject();
    this.getAllGrade();
  }

  getAllSubject() {
    this.subjectService.getAllSubject().subscribe(data => {
      this.listAllSubject = data;
      this.loadingSubject = false;
    });
  }

  getAllGrade() {
    this.subjectService.getAllGrade().subscribe(data => {
      this.listAllGrade = data;
      this.listCheckBox = data;
      this.loadingCheckBoxGrade = false;
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}

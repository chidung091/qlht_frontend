import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {EmployeeProfileModel} from '../../../../core/service/model/Employee-profile';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-evaluation-reward',
  templateUrl: './evaluation-reward.component.html',
  styleUrls: ['./evaluation-reward.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EvaluationRewardComponent implements OnInit {
  settings: Array<any> = [{
    text: 'My Profile'
  }, {
    text: 'Friend Requests'
  }, {
    text: 'Account Settings'
  }, {
    text: 'Support'
  }, {
    text: 'Log Out'
  }];
  gridView: any;
  mySelection: any;
  checkDeleteMany = true;
  @ViewChild('deleteDialog') deleteDialog;
  dataItem: EmployeeProfileModel;
  _pageSize: any;
  buttonCount: any;
  pageSizes: any;
  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }
  public openModalDelete(dataItem: EmployeeProfileModel) {
    this.modalService.open(this.deleteDialog, {
      size: 'small',
      centered: true
    });
  }

  pageSizeChange() {

  }
}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Policies} from "../../../../core/_constants";
import {locale} from "../../../../core/_config/i18n/vi";

@Component({
  selector: 'kt-violate-rules',
  templateUrl: './violate-rules.component.html',
  styleUrls: ['./violate-rules.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViolateRulesComponent implements OnInit {

  _roleCreate: string = Policies.CATEGORYMANAGEMENT_EMULATIONCRITERIA_CREATE;

  VI_LANG=locale.data;
  _modalOptions: NgbModalOptions;
  _closeResult: string;
  _mySelection: string[]=[];

  constructor(
    private _modalService: NgbModal,
  ) {
    this._modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      centered: true
    }
  }

  ngOnInit(): void {
  }

  submit(event) {
  }

  open(content, at) {
    this.setAction(at)
    this._modalService.open(content, this._modalOptions).result.then((result) => {
      this._closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this._closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  setAction(at) {
  }
  private getDismissReason(reason:any){
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public closeModal() {
    this._modalService.dismissAll('Cross click');
  }

  okDeleteList(content){
    this._modalService.open(content, this._modalOptions).result.then((result) => {
      this._closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this._closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  actionConfirm() {}
}

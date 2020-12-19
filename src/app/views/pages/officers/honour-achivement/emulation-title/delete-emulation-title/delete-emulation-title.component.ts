import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HonourAchivementService } from '../../honour-achivement-sevice/honour-achivement.service';

@Component({
  selector: 'kt-delete-emulation-title',
  templateUrl: './delete-emulation-title.component.html',
  styleUrls: ['./delete-emulation-title.component.scss']
})
export class DeleteEmulationTitleComponent implements OnInit {

  title: string;
  listIds= [];
  isDisabled: boolean = false
  loading: boolean = false;

  @ViewChild('focus') focus: ElementRef

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private api: HonourAchivementService,
    private toastr: ToastrService
  ) { }

  ngAfterViewInit() {
    this.focus.nativeElement.focus();
  }

  ngOnInit(): void {
  }

  close(){
    this._NgbActiveModal.close()
  }

  save(){
    this.loading = true;
    this.isDisabled = true;
    this.api.deleteSCB(this.listIds).subscribe(()=>{
      this.toastr.success('Xóa thành công.');
      this.loading = false;
      this.isDisabled = false;
      this._NgbActiveModal.close('ok');
    }, e=>{
      this.loading = false;
      this.isDisabled = false;
    })
  }


}
